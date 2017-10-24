export abstract class Factory<T> {

    private _instaceConstructor: { new(data:any): T };

    constructor(instanceConstructor: { new(data:any): T }) {
        this._instaceConstructor = instanceConstructor;
    }

    public create(data:any): T[] {

        return ( Array.isArray(data) ) ?
            data.map( item => this.createInstance(item) ) :
            [this.createInstance(data)];
    }

    public createInstance(data:any):T {
        return new this._instaceConstructor(data);
    }

}
