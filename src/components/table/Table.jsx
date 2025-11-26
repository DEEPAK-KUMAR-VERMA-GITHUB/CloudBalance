import React, { useMemo, useState } from "react";

const sortData = (rows, sortKey, sortOrder) => {
  if (!sortKey) return rows;

  return [...rows].sort((a, b) => {
    const aValue = a[sortKey]?.toString().toLowerCase() || "";
    const bValue = b[sortKey]?.toString().toLowerCase() || "";

    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
};

const PAGE_SIZE = 10;

const Table = ({
  columns = [],
  data = [],
  searchPlaceholder = "Search...",
  pageSize = PAGE_SIZE,
  onRowClick,
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  // handle sort
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (col, val) => {
    setFilters((prev) => ({ ...prev, [col]: val }));
    setCurrentPage(1);
  };

  //   filtered and sorted data
  const processedData = useMemo(() => {
    let rows = data;

    // global search
    if (search) {
      rows = rows.filter((row) =>
        columns.some((col) =>
          row[col.key]?.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    //   per column filter
    Object.entries(filters).forEach(([col, val]) => {
      if (val) {
        rows = rows.filter((row) =>
          row[col]?.toString().toLowerCase().includes(val.toLowerCase())
        );
      }
    });

    // sorting
    return sortData(rows, sortKey, sortOrder);
  }, [data, search, sortKey, sortOrder, filters, columns]);

  // pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <input
          className="w-64 px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-400 focus:ring"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <span className="text-gray-500 text-sm">
          Showing {processedData.length} record(s)
        </span>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-4 text-left font-medium select-none"
                >
                  <div
                    className={`flex items-center justify-between ${col.sortable ? "cursor-pointer" : ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span>{col.label}</span>
                    {col.sortable && sortKey === col.key && (
                      <span className="text-slate-400" >{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>

                  {col.filterable && (
                    <input
                      type="text"
                      className="mt-1 w-full px-2 py-1 border border-gray-200 rounded text-xs focus:border-blue-300 focus:ring"
                      placeholder={`Filter ${col.label}`}
                      value={filters[col.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(col.key, e.target.value)
                      }
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            )}

            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 align-middle">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginated controls */}

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-3 space-x-2">
          <button
            disabled={currentPage === 1}
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-2 py-1 rounded cursor-pointer ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white "
                  : "bg-gray-200"
              }`}
              disabled={currentPage === idx - 1}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
