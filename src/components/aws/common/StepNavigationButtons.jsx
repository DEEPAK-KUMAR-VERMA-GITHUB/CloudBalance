import { Button, Stack } from "@mui/joy";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOnboarding } from "../../../redux/actions/awsOnboardingActions";

const StepNavigationButtons = ({
  onBack,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  isLoading = false,
  nextLabel = "Next",
  backLabel = "Back",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigate("/aws-accounts");
    dispatch(resetOnboarding());
  };

  return (
    <Stack mt={4} direction={"row"} justifyContent={"space-between"}>
      <Button variant="outlined" color="danger" onClick={handleCancel}>
        Cancel
      </Button>
      <Stack direction={"row"} gap={2}>
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
      </Stack>
    </Stack>
  );
};

export default StepNavigationButtons;
