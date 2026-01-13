import { Box, Button } from "@mui/joy";

const StepNavigationButtons = ({
  onBack,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  isLoading = false,
  nextLabel = "Next",
  backLabel = "Back",
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
      <Button
        variant="outlined"
        color="neutral"
        disabled={isFirstStep || isLoading}
        onClick={onBack}
      >
        {backLabel}
      </Button>
      <Button onClick={onNext} loading={isLoading} disabled={isLoading}>
        {nextLabel}
      </Button>
    </Box>
  );
};

export default StepNavigationButtons;
