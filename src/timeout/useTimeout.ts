import { useEffect, useState } from 'react';

const useTimeout = (ms: number) => {
  const [ status, setStatus ] = useState<Boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(true)
    }, ms);

    return () => {
      clearTimeout(timer)
    };
  }, [ms]);
  
  return status;
}

export default useTimeout;