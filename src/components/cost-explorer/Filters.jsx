import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack
} from "@mui/joy";
import { useState } from "react";

const groupByOptions = [
  { value: "SERVICE_NAME", label: "Service" },
  { value: "ACCOUNT_ID", label: "Account ID" },
  { value: "REGION", label: "Region" },
];

export default function Filters({ filters, setFilters, onRefresh }) {
  const [showMore, setShowMore] = useState(false);

  const handleGroupByClick = (value) => {
    setFilters({ ...filters, groupBy: value });
  };

  const activeOption = groupByOptions.find(
    (opt) => opt.value === filters.groupBy
  );
  const inactiveOptions = groupByOptions.filter(
    (opt) => opt.value !== filters.groupBy
  );

  return (
    <Stack spacing={2}>
      {/* Group By Filter Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          bgcolor: "#f5f5f5",
          borderRadius: "sm",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            color: "#000",
            whiteSpace: "nowrap",
          }}
        >
          Group By:
        </Box>

        {activeOption && (
          <Button
            variant="solid"
            size="sm"
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              borderRadius: "4px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "13px",
              px: 2,
              py: 0.75,
              minHeight: "32px",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
            onClick={() => handleGroupByClick(activeOption.value)}
          >
            {activeOption.label}
          </Button>
        )}

        <Divider orientation="vertical" sx={{ height: "24px", mx: 0.5 }} />

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {inactiveOptions.map((option) => (
            <Button
              key={option.value}
              variant="outlined"
              size="sm"
              sx={{
                bgcolor: "white",
                color: "#1976d2",
                borderColor: "#e0e0e0",
                borderRadius: "4px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "13px",
                px: 2,
                py: 0.75,
                minHeight: "32px",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  borderColor: "#1976d2",
                },
              }}
              onClick={() => handleGroupByClick(option.value)}
            >
              {option.label}
            </Button>
          ))}

          <Button
            variant="plain"
            size="sm"
            endDecorator={<ArrowDropDown />}
            sx={{
              color: "#1976d2",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "13px",
              px: 1.5,
              py: 0.75,
              minHeight: "32px",
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
            onClick={() => setShowMore(!showMore)}
          >
            More
          </Button>
        </Box>

        <IconButton
          variant="outlined"
          size="sm"
          sx={{
            ml: "auto",
            borderColor: "#e0e0e0",
            borderRadius: "4px",
            minWidth: "32px",
            minHeight: "32px",
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="1" fill="currentColor" />
            <circle cx="4" cy="12" r="1" fill="currentColor" />
            <circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>
        </IconButton>
      </Box>
    </Stack>
  );
}
