import { Box, Card, CardContent, Checkbox, Radio, Stack } from "@mui/joy";
import {
  CopyableText,
  ExternalLink,
  StepHeader,
  StepInstruction,
  StepNavigationButtons,
} from "./common";

import curImage1 from "../../assets/images/cur-img-1.png";
import curImage2 from "../../assets/images/cur-img-2.png";
import curImage3 from "../../assets/images/cur-img-3.png";
import { useSelector } from "react-redux";

const StepCreateCUR = ({ onBack, onSubmit }) => {
  const { loading } = useSelector((state) => state.awsOnboarding);
  return (
    <Box>
      <StepHeader
        title={"Create ost & Usage Report"}
        description={"Create a Cost & Usage Report by following these steps"}
      />

      <Stack spacing={2}>
        <Card variant="plain">
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <StepInstruction stepNumber={1}>
              Go to <ExternalLink>Cost and Usage Reports</ExternalLink> in the
              Billing Dashboard and click on <strong>Create report.</strong>
            </StepInstruction>

            <StepInstruction stepNumber={2}>
              Name the report as shown below and select the{" "}
              <strong>Include resource IDs</strong> checkbox -
            </StepInstruction>
            <CopyableText text={"ck-tuner-951485052809-hourly-cur"} />

            <small>Ensure that the following configuration is checked</small>
            <Checkbox
              size="sm"
              variant="solid"
              defaultChecked
              disabled
              color="neutral"
              label="Include Resourec IDs"
              sx={{ fontWeight: 600, fontSize: 14 }}
            />
            <p>
              Click on <strong>Next</strong>
            </p>
            <img src={curImage1} alt="cur-img-1" />

            <StepInstruction stepNumber={3}>
              In <em>Configure S3 Bucket,</em> provide the name of the s3 bucket
              that was created -
            </StepInstruction>

            <small>Ensure that the following configuration is checked</small>
            <Checkbox
              size="sm"
              variant="solid"
              defaultChecked
              color="neutral"
              disabled
              label="The following default policy will be applied to your bucket"
              sx={{ fontWeight: 600, fontSize: 14 }}
            />
            <p>
              Click on <strong>Save</strong>
            </p>
            <img src={curImage2} alt="cur-img-2" />

            <StepInstruction stepNumber={4}>
              In the <em>Delivery options</em> section, enter the
              below-mentioned Report path prefix -
            </StepInstruction>
            <small>Report path prefix : </small>
            <CopyableText text={"951485052809"} />
            <small>
              Additionally, ensure that the following checks are in place
            </small>
            <small>Time granuality:</small>
            <Radio
              variant="outlined"
              label="Hourly"
              defaultChecked
              disabled
              sx={{ fontWeight: 600 }}
            />

            <small>
              Please make sure these checks are Enabled in{" "}
              <strong>Enable report data Integration for :</strong>
            </small>
            <Checkbox
              size="sm"
              variant="solid"
              defaultChecked
              color="neutral"
              disabled
              label="Amazon Athena"
              sx={{ fontWeight: 600, fontSize: 14 }}
            />
            <img src={curImage3} alt="cur-img-3" />

            <StepInstruction stepNumber={5}>
              Click on <strong>Next</strong>. Now, review the configuration of
              the Cost and Usage Report. Once satisfied, click on{" "}
              <strong>Create Report</strong>.
            </StepInstruction>
          </CardContent>
        </Card>

        <StepNavigationButtons
          onBack={onBack}
          nextLabel="Submit"
          onNext={onSubmit}
          isLastStep
          isLoading={loading}
        />
      </Stack>
    </Box>
  );
};

export default StepCreateCUR;
