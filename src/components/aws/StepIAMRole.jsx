import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import IAMRoleImage from "../../assets/images/iam-role.png";
import { updateOnboardingData } from "../../redux/actions/awsOnboardingActions";
import { InputField } from "../form";
import {
  CopyableCodeBlock,
  CopyableText,
  ExternalLink,
  StepHeader,
  StepInstruction,
  StepNavigationButtons,
} from "./common";

const StepIAMRole = ({ onNext, onBack, isFirstStep }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.awsOnboarding);

  const [form, setForm] = useState({
    roleArn: data.roleArn || "",
    accountId: data.accountId || "",
    accountAlias: data.accountAlias || "",
  });

  const [errors, setErrors] = useState({
    roleArn: "",
    accountId: "",
    accountAlias: "",
  });

  const trustPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role",
        },
        Action: "sts:AssumeRole",
        Condition: {
          StringEquals: {
            "sts:ExternalId":
              "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk=",
          },
        },
      },
      {
        Effect: "Allow",
        Principal: {
          Service: "s3.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  };

  const validateIAMRoleForm = (formData) => {
    const errors = {};

    const { roleArn, accountId, accountAlias } = formData;

    if (!roleArn.trim()) {
      errors.roleArn = "Role ARN is required.";
    } else if (!roleArn.match(/^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/)) {
      errors.roleArn = "Invalid Role ARN.";
    } else if (!accountId.trim()) {
      errors.accountId = "Account ID is required.";
    } else if (!accountId.match(/[0-9]{12}/)) {
      errors.accountId = "Invalid account id.";
    } else if (!accountAlias.trim()) {
      errors.accountAlias = "Account name is required.";
    }
    return errors;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Data Copied.");
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const validation = validateIAMRoleForm(form);

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    dispatch(updateOnboardingData(form));
    onNext();
  };

  return (
    <Box>
      <StepHeader
        title={"Create an IAM Role"}
        description={"Create an IAM Role by following these steps"}
      />

      <Stack spacing={2}>
        <Card variant="plain">
          <StepInstruction stepNumber={1}>
            Log into AWS account &{" "}
            <ExternalLink>Create an IAM Role.</ExternalLink>
          </StepInstruction>

          <StepInstruction stepNumber={2}>
            In the <em>Trusted entity type</em> section, select{" "}
            <strong>Custom trust policy</strong>. Replace the prefilled policy
            with the policy provided below:
          </StepInstruction>
          <CopyableCodeBlock content={trustPolicy} />

          <StepInstruction stepNumber={3}>
            Click on <strong>Next</strong> to go to the{" "}
            <em>Add permissions page</em>. We would not be adding any
            permissions for now because the permission policy content will be
            dependent on the AWS Account ID retrieved from the IAM Role. Click
            on <strong>Next</strong>.
          </StepInstruction>

          <StepInstruction stepNumber={4}>
            In the <em>Role name field,</em> enter the below-mentioned role
            name, and click on <strong>Create Role -</strong>
          </StepInstruction>

          <CopyableText text={"CK-Tuner-Role-dev2"} />

          <StepInstruction stepNumber={5}>
            Go to the newly create IAM Role and copy the Role ARN -
          </StepInstruction>

          <img src={IAMRoleImage} alt="iam-role-image" />

          <StepInstruction stepNumber={6}>
            Paste the copied Role ARN below -
          </StepInstruction>

          <form>
            <Box
              sx={{
                display: "flex",
                gap: 4,
              }}
            >
              <InputField
                label={"Enter the IAM Role ARN"}
                isRequired={"true"}
                placeholder={"Enter the IAM Role ARN"}
                value={form.roleArn}
                onChange={(e) => handleChange("roleArn", e.target.value)}
                error={errors.roleArn}
              />

              <InputField
                label={"Enter the account ID"}
                isRequired={"true"}
                placeholder={"Enter the account ID"}
                value={form.accountId}
                onChange={(e) => handleChange("accountId", e.target.value)}
                error={errors.accountId}
              />

              <InputField
                label={"Enter the account name"}
                isRequired={"true"}
                placeholder={"Enter the account name"}
                value={form.accountAlias}
                onChange={(e) => handleChange("accountAlias", e.target.value)}
                error={errors.accountAlias}
              />
            </Box>
          </form>
        </Card>
      </Stack>

      {/* Navigation Buttons */}
      <StepNavigationButtons
        onBack={onBack}
        onNext={onNext}
        isFirstStep="true"
      />
    </Box>
  );
};

export default StepIAMRole;
