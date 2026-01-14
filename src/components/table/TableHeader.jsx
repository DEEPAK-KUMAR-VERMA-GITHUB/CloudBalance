import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const TableHeader = ({
  columns,
  sortBy,
  sortDir,
  filters,
  onSortChange,
  onFilterChange,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const debouncedFilters = useDebounce(localFilters);

  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  return (
    <thead className="bg-gray-50 border-b">
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="px-4 py-3 text-left">
            <div
              className={`flex justify-between ${
                col.sortable ? "cursor-pointer" : ""
              }`}
              onClick={() =>
                col.sortable &&
                onSortChange(
                  col.key,
                  sortBy === col.key && sortDir === "asc" ? "desc" : "asc"
                )
              }
            >
              {col.label}
              {sortBy === col.key && (sortDir === "asc" ? "▲" : "▼")}
            </div>

            {col.filterable && (
              <input
                className="mt-1 w-full border px-2 py-1 text-xs"
                value={localFilters[col.key] || ""}
                onChange={(e) =>
                  setLocalFilters((p) => ({
                    ...p,
                    [col.key]: e.target.value,
                  }))
                }
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
