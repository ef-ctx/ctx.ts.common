export declare class Dictionary<T> {
    private _dictionary;
    private _order;
    constructor();
    addItem(key: string, item: T): T;
    has(key: string): boolean;
    getByKey(key: string): T;
    getByKeys(keys: string[]): Dictionary<T>;
    getArrayByKeys(keys: string[]): T[];
    toArray(): T[];
    forEach(fn: (T) => void): void;
}
