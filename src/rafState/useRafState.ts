import { useRef, useState, useCallback } from "react";

import useUnmount from '../mount/useUnmount'

const useRafState = <S>(initialState: S | (() => S)) => {
  const frame = useRef(0);
  const [state, setstate] = useState(initialState);

  const setRafState = useCallback(
    (value: S | ((prevState: S) => S)) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        setstate(value);
      });
    },
    [],
  );

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
};

export default useRafState;