import { useState, useCallback } from "react";
import useLifecycles from "./useLifecycles";

export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const onHashChange  = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useLifecycles(() => {
    window.addEventListener('hashchange', onHashChange)
  }, () => {
    window.addEventListener('hashchange', onHashChange)
  });

  const _setHash = useCallback((newHash: string) => {
    if (newHash !== hash) {
      window.location.hash = newHash
    }    
  }, [hash]);

  return [hash, _setHash] as const;
}