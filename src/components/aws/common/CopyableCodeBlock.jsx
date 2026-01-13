import React from "react";
import { Box, IconButton } from "@mui/joy";
import { ContentCopy } from "@mui/icons-material";
import toast from "react-hot-toast";

const CopyableCodeBlock = ({
  content,
  maxHeight = "300px",
  language = "json",
}) => {
  const handleCopy = () => {
    const textToCopy =
      typeof content === "string" ? content : JSON.stringify(content, null, 2);

    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  const displayContent =
    typeof content === "string" ? content : JSON.stringify(content, null, 2);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "neutral.50",
        p: 2,
        borderRadius: "sm",
        border: "1px solid",
        borderColor: "neutral.200",
        fontFamily: "monospace",
        fontSize: "sm",
        maxHeight: "400px",
        scrollbarWidth: "thin",
        scrollBehavior: "smooth",
        cursor: "pointer",
        ":hover": {
          border: 1,
          borderColor: "#0A3CA2",
          transition: "all 0.3s ease-in",
        },
      }}
      onClick={handleCopy}
    >
      <IconButton
        size="sm"
        variant="plain"
        sx={{
          position: "absolute",
          top: 20,
          right: 35,
          zIndex: 2,
          backgroundColor: "neutral.50",
        }}
      >
        <ContentCopy fontSize="small" />
      </IconButton>

      <Box
        sx={{
          maxHeight,
          overflow: "auto",
          pr: 4,
          color: "#337AB7",
          fontWeight: "600",
          fontSize: 12,
          lineHeight: "21.6px",
        }}
      >
        <pre style={{ margin: 0 }}>{displayContent}</pre>
      </Box>
    </Box>
  );
};

export default CopyableCodeBlock;
