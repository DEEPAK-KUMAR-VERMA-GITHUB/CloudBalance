import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CostChart from "../components/cost-explorer/Chart";
import Filters from "../components/cost-explorer/Filters";
import CostTable from "../components/cost-explorer/Table";
import { getCostExplorer } from "../redux/actions/costExplorerActions";
import {
  BarChartOutlined,
  StackedBarChartOutlined,
  TimelineOutlined,
} from "@mui/icons-material";

export default function CostExplorerContainer() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.costExplorer);

  const [filters, setFilters] = useState({
    startDate: "2025-07-01",
    endDate: "2025-12-31",
    groupBy: "SERVICE_NAME",
    granularity: "MONTHLY",
  });

  const [chartType, setChartType] = useState("mscolumn2d");

  const refresh = () => {
    dispatch(getCostExplorer(filters));
  };

  useEffect(() => {
    refresh();
  }, [filters]);

  return (
    <Box>
      <Box>
        <Typography level="h3">Cost Explorer</Typography>
        <Typography level="body-sm">
          How to always be aware of cost changes and history.
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Sheet sx={{ p: 2 }}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          onRefresh={refresh}
        />

        {/* Chart Type Switch */}

        {/* Controls Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Left Side - Costs Label */}
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, color: "#495057" }}
          >
            Costs ($)
          </Typography>

          {/* Right Side Controls */}
          <Stack direction={"row"} spacing={2} my={2}>
            {/* Date Range Picker */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                px: 1.5,
                py: 0.5,
                bgcolor: "white",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "#adb5bd",
                },
              }}
            >
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    startDate: e.target.value,
                  })
                }
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  width: "110px",
                }}
              />
              <Typography level="body-sm" sx={{ mx: 0.5, color: "#6c757d" }}>
                -
              </Typography>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    endDate: e.target.value,
                  })
                }
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  width: "110px",
                }}
              />
            </Box>

            {/* Granularity Toggle */}
            <ButtonGroup variant="outlined" size="sm">
              <Button
                variant={filters.granularity === "DAILY" ? "solid" : "outlined"}
                onClick={() => setFilters({ ...filters, granularity: "DAILY" })}
                sx={{
                  bgcolor:
                    filters.granularity === "DAILY" ? "#0d6efd" : "white",
                  color: filters.granularity === "DAILY" ? "white" : "#6c757d",
                  borderColor: "#dee2e6",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  px: 2,
                  "&:hover": {
                    bgcolor:
                      filters.granularity === "DAILY" ? "#0b5ed7" : "#f8f9fa",
                  },
                }}
              >
                Daily
              </Button>
              <Button
                variant={
                  filters.granularity === "MONTHLY" ? "solid" : "outlined"
                }
                onClick={() =>
                  setFilters({ ...filters, granularity: "MONTHLY" })
                }
                sx={{
                  bgcolor:
                    filters.granularity === "MONTHLY" ? "#0d6efd" : "white",
                  color:
                    filters.granularity === "MONTHLY" ? "white" : "#6c757d",
                  borderColor: "#dee2e6",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  px: 2,
                  "&:hover": {
                    bgcolor:
                      filters.granularity === "MONTHLY" ? "#0b5ed7" : "#f8f9fa",
                  },
                }}
              >
                Monthly
              </Button>
            </ButtonGroup>

            {/* Chart Type Icons */}
            <ButtonGroup>
              <IconButton
                variant={chartType === "mscolumn2d" ? "solid" : "outlined"}
                size="sm"
                sx={{
                  bgcolor: chartType === "mscolumn2d" ? "#0d6efd" : "white",
                  color: chartType === "mscolumn2d" ? "white" : "#6c757d",
                  borderColor: "#dee2e6",

                  minWidth: "36px",
                  minHeight: "36px",
                  "&:hover": {
                    bgcolor: chartType === "mscolumn2d" ? "#0b5ed7" : "#f8f9fa",
                  },
                }}
                onClick={() => setChartType("mscolumn2d")}
              >
                <BarChartOutlined />
              </IconButton>

              <IconButton
                variant={chartType === "msline" ? "solid" : "outlined"}
                size="sm"
                onClick={() => setChartType("msline")}
                sx={{
                  bgcolor: chartType === "msline" ? "#0d6efd" : "white",
                  color: chartType === "msline" ? "white" : "#6c757d",
                  borderColor: "#dee2e6",

                  minWidth: "36px",
                  minHeight: "36px",
                  "&:hover": {
                    bgcolor: chartType === "msline" ? "#0b5ed7" : "#f8f9fa",
                  },
                }}
              >
                <TimelineOutlined />
              </IconButton>

              <IconButton
                variant={chartType === "stackedcolumn2d" ? "solid" : "outlined"}
                size="sm"
                sx={{
                  bgcolor:
                    chartType === "stackedcolumn2d" ? "#0d6efd" : "white",
                  color: chartType === "stackedcolumn2d" ? "white" : "#6c757d",
                  borderColor: "#dee2e6",

                  minWidth: "36px",
                  minHeight: "36px",
                  "&:hover": {
                    bgcolor:
                      chartType === "stackedcolumn2d" ? "#0b5ed7" : "#f8f9fa",
                  },
                }}
                onClick={() => setChartType("stackedcolumn2d")}
              >
                <StackedBarChartOutlined />
              </IconButton>
            </ButtonGroup>
          </Stack>
        </Box>

        {loading && <div>Loading...</div>}

        {!loading && data && (
          <Stack spacing={5} >
            <CostChart data={data} filters={filters} chartType={chartType} />
            <CostTable data={data} filters={filters} />
          </Stack>
        )}
      </Sheet>
    </Box>
  );
}
