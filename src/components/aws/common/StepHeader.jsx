import React from 'react';
import { Box, Typography } from '@mui/joy';

const StepHeader = ({ title, description }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography level="h4">{title}</Typography>
      <Typography level="body-md" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default StepHeader;
