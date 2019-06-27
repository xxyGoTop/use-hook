import { useCallback } from 'react';
import useRefMounted from '../mount/useRefMounted';

export type usePromise = <T>(promise: Promise<T>) => Promise<T>;

const usePromise = (): usePromise => {
  const refMounted = useRefMounted();
  return useCallback(
    (promise: Promise<any>) => {
      return new Promise((resolve, reject) => {
        const onValue = (value) => {
          if(refMounted.current) {
            resolve(value)
          }
        };
        const onError = (error) => {
          if(refMounted.current) {
            reject(error)
          }
        };
        promise.then(onValue, onError)
      })
    },
    []
  );
};

export default usePromise;