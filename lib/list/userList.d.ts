interface Actions<T> {
    set: (list: T[]) => void;
    clear: () => void;
    push: (item: T) => void;
    remove: (index: number) => void;
    filter: (fn: (value: T) => boolean) => void;
    sort: (fn?: (a: T, b: T) => number) => void;
    updateIndex: (index: number, item: T) => void;
}
declare const useList: <T>(initList?: T[]) => [T[], Actions<T>];
export default useList;
