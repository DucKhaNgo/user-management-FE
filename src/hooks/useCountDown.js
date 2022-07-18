import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * @param {function} second Init value to start count down.
 * @returns {Array} [time, setTime] time is the count down value.
 * setTime is the function to a new value to count down form (Or reset the timer to the init value)
 */

const useCountDown = (second) => {
  const [timer, setTimer] = useState(second);
  const interVal = useRef();

  const runCountDown = useCallback(() => {
    interVal.current = setInterval(() => {
      setTimer((timer) => {
        let newTime = timer - 1;
        if (newTime <= 0) {
          newTime = 0;
          clearInterval(interVal.current);
        }
        return newTime;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    runCountDown();

    return function cleanUp() {
      clearInterval(interVal.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTimerManually = useCallback(
    (second2 = second) => {
      clearInterval(interVal.current);
      setTimer(second2);

      runCountDown();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [timer, setTimerManually];
};

export default useCountDown;
