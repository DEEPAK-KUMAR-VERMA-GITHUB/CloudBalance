import { Box, Card, Container, Typography } from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StepIAMRole from "../components/aws/StepIAMRole";
import {
  resetOnboarding,
  setActiveStep,
  submitAwsAccount,
} from "../redux/actions/awsOnboardingActions";
import AwsOnboardingStepper from "../components/aws/AwsOnboardingStepper";
import StepCustomerPolicies from "../components/aws/StepCustomerPolicies";
import StepCreateCUR from "../components/aws/StepCreateCUR";
import OnboardingSuccess from "../components/aws/OnboardingSuccess";

const Onboarding = () => {
  const dispatch = useDispatch();
  const { activeStep, completed, data } = useSelector(
    (state) => state.awsOnboarding
  );

  const steps = [
    { label: "A. Create an IAM Role", component: StepIAMRole },
    {
      label: "B. Add Customer Managed Policies",
      component: StepCustomerPolicies,
    },
    { label: "C. Create CUR", component: StepCreateCUR },
  ];

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleSubmit = () => {
    dispatch(submitAwsAccount(data));
  };

  const handleReset = () => {
    dispatch(resetOnboarding());
  };

  if (completed) {
    return <OnboardingSuccess onReset={handleReset} />;
  }

  const CurrentStepComponent = steps[activeStep]?.component;

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "white",
          p: 2,
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <AwsOnboardingStepper steps={steps} activeStep={activeStep} />
      </Box>

      <Box pt={10}>
        {CurrentStepComponent && (
          <CurrentStepComponent
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isFirstStep={activeStep === 0}
            isLastStep={activeStep === steps.length - 1}
          />
        )}
      </Box>
    </Container>
  );
};

export default Onboarding;
