import React from 'react';
import { Typography, Chip } from '@mui/joy';

const StepInstruction = ({ stepNumber, children }) => {
  return (
    <Typography level="title-md" sx={{ mb: 2 }}>
      <Chip size="md" color="primary" sx={{ mr: 1 }}>
        {stepNumber}
      </Chip>
      {children}
    </Typography>
  );
};

export default StepInstruction;
