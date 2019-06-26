declare const useLocalStorage: <T>(key: string, initialValue?: T | undefined, isSerial?: boolean | undefined) => [T, (value: T) => void];
export default useLocalStorage;
