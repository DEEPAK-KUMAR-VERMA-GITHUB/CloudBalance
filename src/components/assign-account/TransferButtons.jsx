import { Box, IconButton } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TransferButtons({
  disabledAdd,
  disabledRemove,
  onAdd,
  onRemove,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <IconButton
        onClick={onAdd}
        disabled={disabledAdd}
        color="primary"
        variant="solid"
      >
        <ArrowForwardIcon />
      </IconButton>

      <IconButton
        onClick={onRemove}
        disabled={disabledRemove}
        color="primary"
        variant="solid"
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
}
