import { Box, Button, Sheet } from "@mui/joy";
import Table from "@mui/joy/Table";
import { consolidateGroupWiseData } from "../../utils/transformCostData";

export default function CostTable({ data, filters }) {
  if (!data) return null;

  const { granularity } = filters;

  // 1) Consolidate groupWiseData
  const groupedData = consolidateGroupWiseData(data.groupWiseData);

  // 2) Determine period columns
  const periodKeys =
    granularity === "MONTHLY"
      ? Object.keys(data.monthlyData)
      : Object.keys(data.dailyData).sort();

  // 3) Build footer totals
  const totalRow = {
    groupName: "Total",
    periodCostData: {},
    totalCost: 0,
  };

  periodKeys.forEach((period) => {
    let sum = 0;
    groupedData.forEach((row) => {
      sum += row.periodCostData[period] || 0;
    });
    totalRow.periodCostData[period] = sum;
    totalRow.totalCost += sum;
  });

  const handleExport = () => {
    const rows = [];

    rows.push(["Group", ...periodKeys, "Total"]);

    // Data rows
    groupedData.forEach((row) => {
      rows.push([
        row.groupName,
        ...periodKeys.map((p) => row.periodCostData[p] || 0),
        row.totalCost,
      ]);
    });

    // Footer
    rows.push([
      "Total",
      ...periodKeys.map((p) => totalRow.periodCostData[p] || 0),
      totalRow.totalCost,
    ]);

    const csvString = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost_report.csv";
    a.click();
  };

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "4px" }}>
      <Box display="flex" justifyContent="end" m={2}>
        <Button variant="outlined" onClick={handleExport}>
          Export
        </Button>
      </Box>

      <Sheet
        variant="plain"
        sx={(theme) => ({
          "--TableCell-height": "40px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "80px",
          "--Table-lastColumnWidth": "144px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                    linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                    radial-gradient(
                      farthest-side at 0 50%,
                      rgba(0, 0, 0, 0.12),
                      rgba(0, 0, 0, 0)
                    ),
                    radial-gradient(
                        farthest-side at 100% 50%,
                        rgba(0, 0, 0, 0.12),
                        rgba(0, 0, 0, 0)
                      )
                      0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        })}
      >
        <Table
          stickyHeader
          borderAxis="both"
          hoverRow
          noWrap
          sx={(theme) => ({
            "& tr > *:first-child": {
              bgcolor: "success.softBg",
              position: "sticky",
              left: 0,
              boxShadow: "1px 0 var(--TableCell-borderColor)",
            },
            "& th": theme.variants.soft.neutral,
            "& tr > *:last-child": {
              bgcolor: "success.softBg",
              position: "sticky",
              right: 0,
            },
          })}
        >
          <thead>
            <tr>
              <th>Group</th>
              {periodKeys.map((col) => (
                <th style={{ bgcolor: "blue" }} key={col}>
                  {col}
                </th>
              ))}
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {groupedData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.groupName}</td>
                {periodKeys.map((col) => (
                  <td key={col}>{row.periodCostData[col] ?? 0}</td>
                ))}
                <td>{row.totalCost}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr style={{ fontWeight: "bold" }}>
              <td>Total</td>
              {periodKeys.map((col) => (
                <td key={col}>{totalRow.periodCostData[col]}</td>
              ))}
              <td>{totalRow.totalCost}</td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Sheet>
  );
}
