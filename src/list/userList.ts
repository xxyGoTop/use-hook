import { useState } from "react";

interface Actions<T>{
  set: (list: T[]) => void,
  clear: () => void,
  push: (item: T) => void,
  remove: (index: number) => void,
  filter: (fn: (value: T) => boolean) => void,
  sort: (fn?: (a: T, b: T) => number) => void,
  updateIndex: (index: number, item: T) => void,
}

const useList = <T>(initList: T[] = []):[T[], Actions<T>] => {
  const [list, set] = useState<T[]>(initList);

  return [
    list, 
    {
      set,
      clear: () => set([]),
      push: item => set(currentList => [...currentList, item]),
      remove: index => set(currentList => [...currentList.slice(0, index), ...currentList.slice(index)]),
      filter: fn => set(currentList => currentList.filter(fn)),
      sort: (fn?) => set(currentList => [...currentList].sort(fn)),
      updateIndex: (index, item) =>
        set(currentList => [...currentList.slice(0, index), item, ...currentList.slice(index)]),
    }
  ]
};

export default useList;