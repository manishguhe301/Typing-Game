import { Box, Typography } from '@mui/material';
import React from 'react';

function Top() {
  return (
    <Box sx={{ pt: 2, borderRadius: 1, height: '80px' }}>
      <Typography
        variant='h2'
        sx={{
          color: 'white',
          fontWeight: '800',
          letterSpacing: '4px',
          fontFamily: "'Roboto Mono', monospace",
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
        }}
      >
        Touch Typing
      </Typography>
    </Box>
  );
}

export default Top;
