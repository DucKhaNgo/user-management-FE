import { useRef, useEffect } from 'react';

/**
 * @param {any} value input value
 * @returns {any} previous value of value
 */
const usePrevious = (value) => {
  const previousValue = useRef();

  useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
};

export default usePrevious;
