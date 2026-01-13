import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import { Step, StepIndicator, Stepper, Typography } from "@mui/joy";
import { Fragment } from "react";

const AwsOnboardingStepper = ({ steps, activeStep }) => {
  return (
    <Stepper
      sx={{
        "--Step-connectorThickness": "0px",
        width: "fit-content",
        alignItems: "center",
      }}
    >
      {steps?.map((step, index) => (
        <Fragment key={step.label}>
          <Step
            indicator={
              <StepIndicator
                variant="solid"
                color={
                  activeStep > index
                    ? "green"
                    : activeStep === index
                    ? "primary"
                    : "white"
                }
              >
                {activeStep >= index ? <CheckCircle /> : <CircleOutlined />}
              </StepIndicator>
            }
          >
            <Typography level="title-sm"> {step.label} </Typography>
          </Step>

          {index < steps.length - 1 && (
            <Typography
              level="body-sm"
              sx={{
                mx: 1,
                color: "text.tertiary",
              }}
            >
              &gt;
            </Typography>
          )}
        </Fragment>
      ))}
    </Stepper>
  );
};

export default AwsOnboardingStepper;
