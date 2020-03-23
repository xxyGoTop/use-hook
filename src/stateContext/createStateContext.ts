import { createContext, createFactory, useContext, useState } from "react";

const createStateContext = <T>(defaultInitialValue: T) => {
  const context = createContext<[T, React.Dispatch<React.SetStateAction<T>>] | undefined>(undefined);
  const provideFactory = createFactory(context.Provider);

  const StateProvider: React.FC<{ initialValue?: T }> = ({ children, initialValue }) => {
    const state = useState(initialValue !== undefined ? initialValue : defaultInitialValue);
    return provideFactory({ value: state }, children);
  };

  const useStateContext = () => {
    const state = useContext(context);

    if (state === null) {
      throw new Error(`useStateContext must be used inside a StateProvider.`)
    }
    return state;
  };

  return [useStateContext, StateProvider, context] as const;
};

export default createStateContext;