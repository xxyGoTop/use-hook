import { RefObject, useState, useRef, useEffect } from 'react';

export interface State {
  x: number,
  y: number
}

const useScroll = (ref: RefObject<HTMLElement>): State => {
  if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
    console.error('`useScroll` expects a single ref argument.');
  }

  const elemt = useRef(0);
  const [state, setState] = useState<State>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handler = () => {
      cancelAnimationFrame(elemt.current)

      elemt.current = requestAnimationFrame(() => {
        if(ref.current) {
          setState({
            x: ref.current.scrollLeft,
            y: ref.current.scrollTop
          })
        }
      });
    };

    if(ref.current) {
      ref.current.addEventListener('scroll', handler, {
        capture: false,
        passive:true
      });
    }

    return () => {
      if(elemt.current) {
        cancelAnimationFrame(elemt.current);
      }
      if(ref.current) {
        ref.current.removeEventListener('scroll', handler);
      }
    };
  }, [ref.current]);

  return state
}

export default useScroll;