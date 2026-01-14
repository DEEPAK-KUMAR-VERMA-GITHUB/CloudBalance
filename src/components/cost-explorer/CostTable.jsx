import { Sheet, Table, Typography } from "@mui/joy";
import { buildCostTable } from "../../utils/costExplorerTransform";

const CostTable = ({ groupWise }) => {
  if (!groupWise?.length) return null;

  const { months, rows } = buildCostTable(groupWise);

  return (
    <Sheet
      variant="outlined"
      sx={{ p: 2, borderRadius: "md", overflow: "auto" }}
    >
      <Typography level="h4" mb={1}>
        Cost by Service
      </Typography>

      <Table
        stickyHeader
        stripe="even"
        hoverRow
        borderAxis="both"
        sx={{
          minWidth: 900,
          "& thead th": {
            bgcolor: "background.level1",
            fontWeight: 600,
          },
        }}
      >
        <thead>
          <tr>
            <th>Service</th>
            {months.map((m) => (
              <th key={m} style={{ textAlign: "right" }}>
                {m}
              </th>
            ))}
            <th style={{ textAlign: "right" }}>Total ($)</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.groupName}>
              <td>{row.groupName}</td>

              {months.map((m) => (
                <td key={m} style={{ textAlign: "right" }}>
                  {row.monthlyData[m]
                    ? `$${row.monthlyData[m].toLocaleString()}`
                    : "-"}
                </td>
              ))}

              <td style={{ textAlign: "right", fontWeight: 600 }}>
                ${row.totalCost.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default CostTable;
