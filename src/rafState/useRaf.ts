import { useLayoutEffect, useState } from 'react';

const useRaf = (ms: number = 1e12, delay: number = 0): number =>{
  const [elapsed, set] = useState<number>(0);

  useLayoutEffect(() => {
    let raf;
    let timerStop;
    let start;

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms);
      set(time);
      loop();
    };
    const loop = () =>{
      raf = requestAnimationFrame(onFrame);
    };
    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf);
        set(1);
      }, ms);
      start = Date.now();
      loop();
    };
    const timeDelay = setTimeout(onStart, delay);
    return () => {
      clearTimeout(timerStop);
      clearTimeout(timeDelay);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);
  
  return elapsed;
};

export default useRaf;