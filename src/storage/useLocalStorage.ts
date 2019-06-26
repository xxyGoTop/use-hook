import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue?: T, isSerial?: boolean): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storageValue = localStorage.getItem(key);
      if(typeof storageValue !== 'string') {
        localStorage.setItem(key, isSerial ? String(initialValue) : JSON.stringify(initialValue));
        return initialValue;
      } else {
        return isSerial ? storageValue : JSON.parse(storageValue || 'null');
      }
    } catch {
      console.error('init storage value error')
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, isSerial ? String(state) : JSON.stringify(state));
    } catch {
      console.error('set storage value error')
    }
  });

  return [state, setState];
};

export default useLocalStorage;