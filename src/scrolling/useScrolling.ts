import { useState, useEffect, RefObject } from "react";

const useScrolling = (ref: RefObject<HTMLElement>) => {
  const [ isScrolling, setScrolling ] = useState<boolean>(false);

  useEffect(() => {
    if(ref.current) {
      let scrollingTimeout;

      const handleEnd = () => {
        setScrolling(false)
      }

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingTimeout);
        scrollingTimeout = setTimeout(() => handleEnd(), 150);
      }
      ref.current.addEventListener('scroll', handleScroll, false);

      return () => {
        ref.current && ref.current.removeEventListener('scroll', handleScroll, false);
      }
    }
    return () => {}
  }, [ref.current])

  return isScrolling;
}

export default useScrolling;