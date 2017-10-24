
export class Dictionary<T> {

    private _dictionary: { [key:string] : T };
    private _order: string[];

    constructor() {
        this._dictionary = {};
        this._order = [];
    }

    addItem(key:string, item: T): T {

        if(this._dictionary[key]) {
            console.warn(`Dictionary Error : addItem(${key}, item). there is another item with key: ${key} `);
        } else {
            this._dictionary[key] = item;
            this._order.push(key);
        }

        return item;
    }

    has(key: string): boolean {
        return !!this._dictionary[key];
    }

    getByKey(key: string): T {
        return this._dictionary[key];
    }

    getByKeys(keys: string[]): Dictionary<T> {
        var items: Dictionary<T> = new Dictionary<T>();

        for(let key in this._dictionary) {
            if(keys.indexOf(key) > -1) {
                items.addItem(key, this._dictionary[key]);
            }
        }

        return items;
    }

    getArrayByKeys(keys: string[]): T[] {
        return keys.map( (key) => this.getByKey(key) );
    }

    toArray(): T[] {

        return this._order.map( key => this._dictionary[key] );
    }

    forEach( fn: (T) => void ): void {
        return this.toArray().forEach(fn);
    }

}
