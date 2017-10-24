

export class Map<K,V> {

    private _source: [K, V][];

    constructor(source?: [K, V][]) {

        this._source = [];

        if(!source) {
            return;
        }

        source.forEach((keyValuePair: [K, V]) => {
            this._source.push([keyValuePair[0], keyValuePair[1]]);
        });
    }

    get size(): number { return this._source.length; }


    public toArray():[K, V][] {

        return this._source.map((keyValuePair: [K, V]): [K, V] => {
            return [keyValuePair[0], keyValuePair[1]];
        });
    }

    public set(key: K, value: V): void {

        var kvp: [K, V] = this._getKeyValuePairByKey(key);

        if(kvp) {
            kvp[1] = value;
            return;
        }

        this._source.push([key, value]);
    }

    public get(key: K): V {

        var kvp: [K, V] = this._getKeyValuePairByKey(key);

        return kvp ? kvp[1] : undefined;
    }

    public delete(key: K): boolean {

        var kvp: [K, V] = this._getKeyValuePairByKey(key);

        if(!kvp) {
            return false;
        }

        this._source.splice(this._source.indexOf(kvp), 1);

        return true;
    }

    public has(key: K): boolean {
        return !!this.get(key);
    }

    public keys(): K[] {

        return this._source.map((keyValuePair: [K, V]): K => {
            return keyValuePair[0];
        });
    }

    public values() {

        return this._source.map((keyValuePair: [K, V]): V => {
            return keyValuePair[1];
        });
    }

    public forEach(handler: (value:V, key: K) => void): void {

        this._source.forEach((keyValuePair: [K, V]) => {
            handler(keyValuePair[1], keyValuePair[0]);
        });
    }

    public clear(): void {
        this._source = [];
    }

    //////////////////////////////////////////////////////////////////////

    private _getKeyValuePairByKey(key: K): [K, V] {

        var res: [K, V][] = this._source.filter((keyValuePair: [K, V]) => {
            return keyValuePair[0] === key;
        });

        return res.length ? res[0] : undefined;
    }
}