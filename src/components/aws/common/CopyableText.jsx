import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/joy";
import toast from "react-hot-toast";

const CopyableText = ({ text, width = "fit-content" }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Box
      sx={{
        backgroundColor: "neutral.50",
        p: 2,
        borderRadius: "sm",
        border: "1px solid",
        borderColor: "neutral.200",
        display: "flex",
        alignItems: "center",
        width,
        gap: 1,
        ":hover": {
          border: 1,
          borderColor: "#0A3CA2",
          transition: "all 0.3s ease-in",
        },
      }}
      onClick={handleCopy}
    >
      <IconButton size="sm" variant="plain" onClick={handleCopy}>
        <ContentCopy fontSize="small" />
      </IconButton>
      <Typography level="body-sm" sx={{ fontFamily: "monospace" }}>
        {text}
      </Typography>
      <Typography  > </Typography>
    </Box>
  );
};

export default CopyableText;
