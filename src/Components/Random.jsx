import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Random = () => {
  const { currentText } = useSelector((store) => store.AppReducer);
  return (
    <Box
      sx={{
        boxShadow:
          'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        border: '1px solid black',
        width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
        margin: 'auto',
        pb: 2,
        mt: 3,
        mb: 4,
        borderRadius: '10px',
      }}
    >
      <Typography
        sx={{
          mt: 2,
          fontSize: '50px',
          fontFamily: "'Roboto Mono', monospace",
        }}
      >
        {currentText}
      </Typography>
    </Box>
  );
};

export default Random;
