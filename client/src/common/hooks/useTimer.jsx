import { useState, useEffect } from 'react';

const useTimer = initialTime => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [time]);

  return time;
};

export default useTimer;
