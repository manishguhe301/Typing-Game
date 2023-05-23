const initialState = {
  currentText: '',
  wordsPerMinute: 0,
  accuracy: 0,
  totalCharactersTypedInFiveMinutes: 0,
  wordsPerMinuteInFiveMinutes: 0,
};

function AppReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE': {
      return { ...state, currentText: payload };
    }
    case 'SHOW': {
      const { wpm, accuracy } = payload;
      return {
        ...state,
        wordsPerMinute: wpm,
        accuracy,
      };
    }
    case '5MIN': {
      const { totalCharacterTyped, WPM } = payload;
      return {
        ...state,
        totalCharactersTypedInFiveMinutes: totalCharacterTyped,
        wordsPerMinuteInFiveMinutes: WPM,
      };
    }

    default:
      return state;
  }
}
export { AppReducer };
