import React from "react";
import { Box, Button, Typography, Card } from "@mui/joy";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const OnboardingSuccess = ({ onReset }) => {
  const navigate = useNavigate();
  const handleGotoDashboard = () => {
    onReset();
    navigate("/dashboard");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CheckCircle sx={{ fontSize: 80, color: "green", mb: 3 }} />
      <Typography level="h2" sx={{ mb: 1 }}>
        AWS Account Onboarded Successfully!
      </Typography>
      <Typography
        level="body-lg"
        sx={{ mb: 4, color: "black", textAlign: "center" }}
      >
        Your AWS account has been successfully connected to CloudBalance.
        <br />
        You can now start monitoring your cloud costs.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={onReset}>
          Onboard Another Account
        </Button>
        <Button onClick={handleGotoDashboard}>Go to Dashboard</Button>
      </Box>
    </Box>
  );
};

export default OnboardingSuccess;
