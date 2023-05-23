import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const min = Math.floor(second / 60);
  const sec = second % 60;

  return (
    <div>
      Min: {min} Seconds: {sec}
    </div>
  );
};

export default Timer;
