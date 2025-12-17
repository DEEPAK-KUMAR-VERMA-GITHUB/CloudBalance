import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Filter,
  Copy,
  CheckSquare,
  Square,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Loader2,
  ChevronRight,
  ChevronDown as ChevronDownSmall,
} from "lucide-react";
import { FixedSizeList as List } from "react-window";

/* ================= TYPES ================= */
export type SortDirection = "asc" | "desc" | null;

export type Column<T> = {
  key: keyof T;
  label: string;
  width: number;
  filterable?: boolean;
  sortable?: boolean;
  visible?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

export type GroupBy<T> = {
  key: keyof T;
  label: string;
};

export type BulkAction<T> = {
  label: string;
  onClick: (rows: T[]) => void;
};

export type RowAction<T> = {
  label: string;
  onClick: (row: T) => void;
};

export type FetchParams = {
  cursor?: string | null;
  filters: Record<string, string>;
  sortKey?: string;
  sortDir?: SortDirection;
};

export type FetchResult<T> = {
  rows: T[];
  nextCursor?: string | null;
};

export type GenericTableProps<T> = {
  columns: Column<T>[];
  rowKey: (row: T) => string;
  height?: number;
  isLoading?: boolean;
  bulkActions?: BulkAction<T>[];
  rowActions?: RowAction<T>[];
  groupBy?: GroupBy<T>;

  /** server-side */
  data: T[];
  fetchMore: (params: FetchParams) => Promise<FetchResult<T>>;
  hasMore: boolean;
};

/* ================= COMPONENT ================= */
export default function GenericTable<T>({
  data,
  columns,
  rowKey,
  height = 520,
  isLoading,
  bulkActions = [],
  rowActions = [],
  groupBy,
  fetchMore,
  hasMore,
}: GenericTableProps<T>) {
  const visibleColumns = useMemo(
    () => columns.filter((c) => c.visible !== false),
    [columns]
  );

  const [filters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<any>>(new Set());
  const [focusedRow, setFocusedRow] = useState<number>(0);

  const liveRegionRef = useRef<HTMLDivElement>(null);

  /* ================= GROUPING ================= */
  const groupedData = useMemo(() => {
    if (!groupBy) return [{ group: null, rows: data }];

    const map = new Map<any, T[]>();
    data.forEach((row) => {
      const key = row[groupBy.key];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    });

    return Array.from(map.entries()).map(([group, rows]) => ({ group, rows }));
  }, [data, groupBy]);

  const flatRows = useMemo(() => {
    const result: Array<
      | { type: "group"; value: any }
      | { type: "row"; value: T }
    > = [];

    groupedData.forEach((g) => {
      if (g.group !== null) result.push({ type: "group", value: g.group });
      if (g.group === null || expandedGroups.has(g.group)) {
        g.rows.forEach((r) => result.push({ type: "row", value: r }));
      }
    });

    return result;
  }, [groupedData, expandedGroups]);

  /* ================= SELECTION ================= */
  const toggleRow = (id: string, shift = false) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (shift && next.size > 0) {
        next.add(id);
      } else {
        next.has(id) ? next.delete(id) : next.add(id);
      }
      return next;
    });

    liveRegionRef.current!.textContent = `Row ${id} ${selected.has(id) ? "deselected" : "selected"}`;
  };

  /* ================= SORT ================= */
  const onSort = (key: string) => {
    let nextDir: SortDirection = "asc";
    if (sortKey === key) {
      nextDir = sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc";
    }

    setSortKey(nextDir ? key : undefined);
    setSortDir(nextDir);
    setCursor(null);
  };

  /* ================= FETCH MORE ================= */
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);

    const res = await fetchMore({
      cursor,
      filters,
      sortKey,
      sortDir,
    });

    setCursor(res.nextCursor ?? null);
    setLoadingMore(false);
    liveRegionRef.current!.textContent = "Loaded more rows";
  }, [cursor, filters, sortKey, sortDir, hasMore, loadingMore, fetchMore]);

  /* ================= KEYBOARD NAV ================= */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") setFocusedRow((r) => Math.min(r + 1, flatRows.length - 1));
    if (e.key === "ArrowUp") setFocusedRow((r) => Math.max(r - 1, 0));
    if (e.key === " ") {
      const item = flatRows[focusedRow];
      if (item?.type === "row") toggleRow(rowKey(item.value), e.shiftKey);
    }
  };

  /* ================= ROW ================= */
  const Row = ({ index, style }: { index: number; style: any }) => {
    if (index === flatRows.length) {
      loadMore();
      return (
        <div style={style} role="row" className="flex items-center justify-center text-gray-500">
          <Loader2 className="animate-spin" /> Loading more…
        </div>
      );
    }

    const item = flatRows[index];

    if (item.type === "group") {
      const expanded = expandedGroups.has(item.value);
      return (
        <div
          style={style}
          role="row"
          className="sticky top-[48px] bg-gray-100 font-semibold px-4 py-2 border-b flex items-center gap-2"
        >
          <button
            onClick={() => {
              setExpandedGroups((prev) => {
                const next = new Set(prev);
                expanded ? next.delete(item.value) : next.add(item.value);
                return next;
              });
            }}
          >
            {expanded ? <ChevronDownSmall /> : <ChevronRight />}
          </button>
          {groupBy?.label}: {String(item.value)}
        </div>
      );
    }

    const row = item.value;
    const id = rowKey(row);
    const isFocused = index === focusedRow;

    return (
      <div
        role="row"
        tabIndex={-1}
        aria-selected={selected.has(id)}
        data-focused={isFocused}
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns: `40px ${visibleColumns.map((c) => c.width).join("px ")}px 40px`,
        }}
        className={`border-b hover:bg-gray-50 ${isFocused ? "ring-2 ring-blue-400" : ""}`}
      >
        <div role="gridcell" className="flex items-center justify-center">
          <button onClick={(e) => toggleRow(id, e.shiftKey)}>
            {selected.has(id) ? <CheckSquare /> : <Square />}
          </button>
        </div>

        {visibleColumns.map((col) => (
          <div key={String(col.key)} role="gridcell" className="px-4 py-3 flex items-center gap-2">
            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
            {String(col.key).toLowerCase().includes("id") && (
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-400"
                onClick={() => navigator.clipboard.writeText(String(row[col.key]))}
              />
            )}
          </div>
        ))}

        <div role="gridcell" className="flex items-center justify-center">
          {rowActions.length > 0 && (
            <div className="relative group">
              <MoreVertical className="cursor-pointer" />
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow-md z-20">
                {rowActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => action.onClick(row)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const gridTemplate = `40px ${visibleColumns.map((c) => c.width).join("px ")}px 40px`;

  return (
    <div
      className="rounded-2xl border bg-white shadow-sm"
      role="grid"
      aria-rowcount={flatRows.length}
      aria-colcount={visibleColumns.length + 2}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div ref={liveRegionRef} aria-live="polite" className="sr-only" />

      {/* Header */}
      <div
        className="sticky top-0 z-20 bg-blue-700 text-white grid"
        style={{ gridTemplateColumns: gridTemplate }}
        role="rowgroup"
      >
        <div role="columnheader" className="flex items-center justify-center">
          <Square />
        </div>

        {visibleColumns.map((col) => (
          <div
            key={String(col.key)}
            role="columnheader"
            aria-sort={
              sortKey === col.key
                ? sortDir === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className="px-4 py-3 font-semibold flex items-center gap-1 cursor-pointer"
            onClick={() => col.sortable && onSort(String(col.key))}
          >
            {col.label}
            {col.sortable && sortKey === col.key && sortDir === "asc" && <ChevronUp />}
            {col.sortable && sortKey === col.key && sortDir === "desc" && <ChevronDown />}
          </div>
        ))}
        <div role="columnheader" />
      </div>

      {/* Body */}
      <div style={{ height }} role="rowgroup">
        {isLoading && data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">Loading…</div>
        ) : flatRows.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">No data</div>
        ) : (
          <List
            height={height}
            itemCount={hasMore ? flatRows.length + 1 : flatRows.length}
            itemSize={48}
            width="100%"
          >
            {Row}
          </List>
        )}
      </div>
    </div>
  );
}
