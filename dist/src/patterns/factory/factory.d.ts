export declare abstract class Factory<T> {
    private _instaceConstructor;
    constructor(instanceConstructor: {
        new (data: any): T;
    });
    create(data: any): T[];
    createInstance(data: any): T;
}
