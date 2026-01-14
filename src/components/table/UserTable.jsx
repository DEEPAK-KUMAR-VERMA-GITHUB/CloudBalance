import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";

const UserTable = ({
  columns,
  data,
  page,
  pageSize,
  total,
  sortBy,
  sortDir,
  filters,
  onSortChange,
  onFilterChange,
  onPageChange,
}) => {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <TableHeader
          columns={columns}
          sortBy={sortBy}
          sortDir={sortDir}
          filters={filters}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
        />

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center">
                No records found
              </td>
            </tr>
          )}

          {data.map((row, idx) => (
            <tr key={row.id} className={idx % 2 ? "bg-gray-50" : ""}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key] ?? "---"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserTable;
