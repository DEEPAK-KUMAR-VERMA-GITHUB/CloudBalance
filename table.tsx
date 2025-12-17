import { useState, useMemo, useCallback } from "react";
import {
  Filter,
  Copy,
  CheckSquare,
  Square,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Loader2,
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
  fetchMore,
  hasMore,
}: GenericTableProps<T>) {
  const visibleColumns = columns.filter((c) => c.visible !== false);

  const [filters, setFilters] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("table-filters");
    return saved ? JSON.parse(saved) : {};
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  /* ================= SELECTION ================= */
  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = selected.size === data.length && data.length > 0;

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
  }, [cursor, filters, sortKey, sortDir, hasMore, loadingMore, fetchMore]);

  /* ================= ROW ================= */
  const Row = ({ index, style }: { index: number; style: any }) => {
    if (index === data.length) {
      loadMore();
      return (
        <div style={style} className="flex items-center justify-center text-gray-500">
          <Loader2 className="animate-spin" /> Loading more…
        </div>
      );
    }

    const row = data[index];
    const id = rowKey(row);

    return (
      <div
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns: `40px ${visibleColumns.map((c) => c.width).join("px ")}px 40px`,
        }}
        className="border-b hover:bg-gray-50"
      >
        <div className="flex items-center justify-center">
          <button onClick={() => toggleRow(id)}>
            {selected.has(id) ? <CheckSquare /> : <Square />}
          </button>
        </div>

        {visibleColumns.map((col) => (
          <div key={String(col.key)} className="px-4 py-3 flex items-center gap-2">
            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
            {String(col.key).toLowerCase().includes("id") && (
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-400"
                onClick={() => navigator.clipboard.writeText(String(row[col.key]))}
              />
            )}
          </div>
        ))}

        {/* Row Actions */}
        <div className="flex items-center justify-center">
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

  /* ================= HEADER GRID ================= */
  const gridTemplate = `40px ${visibleColumns.map((c) => c.width).join("px ")}px 40px`;

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* Bulk Actions */}
      {selected.size > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-4 px-4 py-2 border-b bg-gray-50">
          <span className="text-sm font-medium">{selected.size} selected</span>
          {bulkActions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.onClick(data.filter((r) => selected.has(rowKey(r))))}
              className="text-sm font-semibold text-blue-600"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Header */}
      <div
        className="sticky top-0 z-10 bg-blue-700 text-white grid"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <div className="flex items-center justify-center">
          <button onClick={() => setSelected(allSelected ? new Set() : new Set(data.map(rowKey)))}>
            {allSelected ? <CheckSquare /> : <Square />}
          </button>
        </div>

        {visibleColumns.map((col) => (
          <div
            key={String(col.key)}
            className="px-4 py-3 font-semibold flex items-center gap-1 cursor-pointer"
            onClick={() => col.sortable && onSort(String(col.key))}
          >
            {col.label}
            {col.sortable && sortKey === col.key && sortDir === "asc" && <ChevronUp />}
            {col.sortable && sortKey === col.key && sortDir === "desc" && <ChevronDown />}
          </div>
        ))}
        <div />
      </div>

      {/* Filters */}
      <div
        className="sticky top-[48px] z-10 bg-blue-600 grid"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <div />
        {visibleColumns.map((col) => (
          <div key={String(col.key)} className="px-4 py-2">
            {col.filterable && (
              <input
                className="w-full rounded-md px-2 py-1 text-black"
                value={filters[String(col.key)] || ""}
                onChange={(e) => {
                  setFilters({ ...filters, [String(col.key)]: e.target.value });
                  setCursor(null);
                }}
                placeholder={`Filter ${col.label}`}
              />
            )}
          </div>
        ))}
        <div />
      </div>

      {/* Body */}
      <div style={{ height }}>
        {isLoading && data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">Loading…</div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">No data</div>
        ) : (
          <List
            height={height}
            itemCount={hasMore ? data.length + 1 : data.length}
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
