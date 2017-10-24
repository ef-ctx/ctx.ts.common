export declare class Map<K, V> {
    private _source;
    constructor(source?: [K, V][]);
    readonly size: number;
    toArray(): [K, V][];
    set(key: K, value: V): void;
    get(key: K): V;
    delete(key: K): boolean;
    has(key: K): boolean;
    keys(): K[];
    values(): V[];
    forEach(handler: (value: V, key: K) => void): void;
    clear(): void;
    private _getKeyValuePairByKey(key);
}
