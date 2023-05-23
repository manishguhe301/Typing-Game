import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function Result() {
  const {
    accuracy,
    totalCharactersTypedInFiveMinutes,
    wordsPerMinuteInFiveMinutes,
  } = useSelector((store) => store.AppReducer);
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          mt: 5,
        }}
      >
        <Typography variant='h4'>
          <Box
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontFamily: "'Roboto Mono', monospace",
            }}
          >
            WPM :- {wordsPerMinuteInFiveMinutes}
          </Box>
        </Typography>
        <Typography variant='h4'>
          <Box
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontFamily: "'Roboto Mono', monospace",
            }}
          >
            Accuracy :- {`${accuracy}%`}
          </Box>
        </Typography>
      </Box>
      <Typography sx={{ mt: 2 }}>
        <Typography
          sx={{
            fontSize: {
              xs: '1rem',
              sm: '1.25rem',
              md: '1.5rem',
              lg: '1.75rem',
            },
            fontFamily: "'Roboto Mono', monospace",
          }}
        >
          Number of keys pressed in a 5 min :-{' '}
          {totalCharactersTypedInFiveMinutes}
        </Typography>
      </Typography>
    </Box>
  );
}

export default Result;
