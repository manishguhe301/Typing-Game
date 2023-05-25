import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const plainText = [
  'aada aa aa aa',
  'sds sklj;s ss ss',
  'dd dd dd dd',
  'll ll ll ll',
  'asdf l;l;',
  'ls dj al dl',
  'as as as as',
  'dss dss dss fdss',
  'df df df df',
  'ff f;f jfjf ff',
  'gg gg gg gg',
  'asdj ;lgf',
  'sdja hl;g',
  'djsa lg;h',
  'hh hsdah hh hh',
  'jj jj jj jj',
  'kkkk gghkk kk',
  'gh gh gh gh',
  'jk jk jk jk',
  'l; l; l; l;',
  'sa df gj lk',
  'dj aasdfl sk ;l',
  'as df gj kl',
  'sd jg la ;k',
  'djsa fghl',
  'sadj hgfl',
  'jdassdl;gh',
  'adsjjhj ;flg',
  'sjaddssglh;',
  'js;lhg',
  'das das das das',
  'jala alala lalala',
];
const Compare = () => {
  const currentText = useSelector((store) => store.AppReducer.currentText);

  const [inputValue, setInputValue] = useState('');
  const [currentCharacter, setCurrentCharacter] = useState(currentText[0]);
  const [startTime, setStartTime] = useState(null);
  const [totalCharacterTyped, setTotalCharacterTyped] = useState(1);
  const [incorrectCharactersTyped, setIncorrectCharactersTyped] = useState(0);
  const [characterStatus, setCharacterStatus] = useState({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [totalCharactersInFiveMinutes, setTotalCharactersInFiveMinutes] =
    useState(0);
  const [
    incorrectCharactersInFiveMinutes,
    setIncorrectCharactersInFiveMinutes,
  ] = useState(0);
  const [textLevel, setTextLevel] = useState('plainText');

  const dispatch = useDispatch();

  if (secondsElapsed % 300 === 0 && secondsElapsed !== 0 && timerId) {
    clearInterval(timerId);
    setSecondsElapsed(0);
    console.log('ll');
    const match = (Date.now() - startTime) / 1000;
    const WPM = Math.round(totalCharactersInFiveMinutes / 5 / (match / 60));
    const NumWPM = Math.round(
      (totalCharactersInFiveMinutes - incorrectCharactersInFiveMinutes) /
        5 /
        (match / 60)
    );
    const accuracy = Math.floor((NumWPM * 100) / WPM);
    dispatch({ type: '5MIN', payload: { totalCharactersInFiveMinutes, WPM } });
  }

  function runtr() {
    setTotalCharactersInFiveMinutes(0);
    setIncorrectCharactersInFiveMinutes(0);
    let id = setInterval(() => {
      setSecondsElapsed((seconds) => seconds + 1);
    }, 1000);
    setTimerId(id);
  }

  const handleTextChange = () => {
    if (textLevel === 'plainText') {
      const randomValue = Math.floor(Math.random() * plainText.length);

      setCurrentCharacter(plainText[randomValue][0]);

      dispatch({ type: 'CHANGE', payload: plainText[randomValue] });
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (secondsElapsed === 0 && !timerId) {
      let id = setInterval(() => {
        setSecondsElapsed((seconds) => seconds + 1);
      }, 1000);
      setTimerId(id);
    }

    let test = '';
    for (let i = 0; i < value.length; i++) {
      test = test + currentText[i];
      if (value[i] === currentText[i] && characterStatus[i] === undefined) {
        characterStatus[i] = true;
        setCharacterStatus({ ...characterStatus });
      } else if (characterStatus[i] === undefined) {
        characterStatus[i] = false;
        setCharacterStatus({ ...characterStatus });
      }
    }

    if (value.length > inputValue.length) {
      setTotalCharacterTyped((pre) => pre + 1);
      setTotalCharactersInFiveMinutes(totalCharactersInFiveMinutes + 1);
    }

    //  word per min
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (test !== value) {
      setIncorrectCharactersTyped(incorrectCharactersTyped + 1);
      setIncorrectCharactersInFiveMinutes(incorrectCharactersInFiveMinutes + 1);
    } else {
      if (value[value.length - 1] === currentText[value.length - 1]) {
        setCurrentCharacter(currentText[value.length]);
      }
    }

    if (test === value && value.length === currentText.length) {
      const match = (Date.now() - startTime) / 1000;
      const WPM = Math.round(totalCharacterTyped / 5 / (match / 60));
      const NumWPM = Math.round(
        (totalCharacterTyped - incorrectCharactersTyped) / 5 / (match / 60)
      );

      const accuracy = Math.floor((NumWPM * 100) / WPM);

      setInputValue('');
      setStartTime(null);
      setTotalCharacterTyped(1);
      setCharacterStatus({});
      setIncorrectCharactersTyped(0);
      dispatch({ type: 'SHOW', payload: { wpm: WPM, accuracy: accuracy } });
      handleTextChange();
    }
  };

  useEffect(() => {
    handleTextChange();
  }, []);

  const minutes = Math.floor(secondsElapsed / 60);
  const secondss = secondsElapsed % 60;

  return (
    <div>
      <Box
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        gap={'20px'}
        marginTop={'20px'}
        marginBottom={'30px'}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '30px' }}>Enter Key -</Typography>
          <Button
            variant='outlined'
            sx={{
              width: 120,
              color: 'white',
              marginLeft: '20px',
              backgroundColor: 'teal',
              fontSize: '25px',
              height: 50,
            }}
          >
            {currentCharacter === ' ' ? 'Space' : currentCharacter}
          </Button>
        </Box>
        <Box
          sx={{
            fontSize: '20px',
          }}
        >
          Minutes: {minutes} Seconds: {secondss}
          {secondsElapsed === 0 && (
            <Button
              variant='outlined'
              sx={{
                marginLeft: '10px',
                color: 'white',
                backgroundColor: 'teal',
              }}
              onClick={runtr}
            >
              Start
            </Button>
          )}
        </Box>
      </Box>
      <TextField
        placeholder='Start Typing........'
        sx={{
          width: { sm: `200`, md: `700` },
          marginTop: `20px`,
          '& .MuiInputBase-root': {
            height: 80,
            borderRadius: '10px',
            background: `#fff`,
            boxShadow:
              'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
          },
        }}
        inputProps={{ style: { fontSize: 30 } }}
        value={inputValue}
        onChange={handleInput}
      />
    </div>
  );
};

export default Compare;
