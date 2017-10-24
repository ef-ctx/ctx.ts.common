import {Map} from "./map";
import Spy = jasmine.Spy;

class TestObject {}


describe('Map', () => {

    let map: Map<string,TestObject>,
        source: [string, TestObject][];

    describe('initialisation', () => {

        beforeEach(() => {
            source = [['1', new TestObject()], ['2', new TestObject()]];
        });

        it('adds source', () => {

            map = new Map<string, TestObject>(source);

            expect(map.size).toBe(2);
        });

        it('copies source key value pair arrays to encapsulate', () => {

            map = new Map<string, TestObject>(source);

            let copy: [string, TestObject][] = source.map((keyValuePair: [string, TestObject]): [string, TestObject] => {
                return [keyValuePair[0], keyValuePair[1]];
            });

            source[0][0] = '3';

            expect(source[0][0]).toBe('3');
            expect(map.toArray()).toEqual(copy);
        })
    });

    describe('api', () => {

        let key: string = '1',
            value: TestObject = new TestObject();

        beforeEach(() => {
            map = new Map<string,TestObject>();
        });

        describe('set', () => {

            it('adds the kvp to the map', () => {

                expect(map.size).toBe(0);

                map.set(key, value);

                expect(map.size).toBe(1);
                expect(map.get(key)).toBe(value);
            });

            it('overwrites an existing key', () => {

                let newValue = new TestObject();

                map.set(key, value);

                expect(map.get(key)).toBe(value);

                map.set(key, newValue);

                expect(map.get(key)).toBe(newValue);
            });
        });

        describe('get', () => {

            it('returns undefined if the key does not exist', () => {

                expect(map.get(key)).toBeUndefined();
            });

            it('returns the value assigned to the supplied key', () => {

                map.set(key, value);

                expect(map.get(key)).toBe(value);
            });
        });

        describe('delete', () => {

            it('delete the supplied key from the map and return true', () => {

                source = [['1', new TestObject()], ['2', new TestObject()]];
                map = new Map<string,TestObject>(source);

                expect(map.size).toBe(2);

                expect(map.delete('1')).toBe(true);

                expect(map.size).toBe(1);
                expect(map.get('1')).toBeUndefined();
                expect(map.has('1')).toBe(false);
            });

            it('returns false if the key does not exist', () => {

                expect(map.delete('1')).toBe(false);
            });
        });

        describe('has', () => {

            it('returns true if there is a value associated with the key', () => {

                map.set(key, value);

                expect(map.has(key)).toBe(true);
            });

            it('returns false if there is no value associated with the key', () => {
                expect(map.has(key)).toBe(false);
            });
        });

        describe('keys', () => {

            it('returns all keys in the order they where inserted', () => {

                var keys: string[] = ['1', '5', '3', '4', '2'];

                keys.forEach((key: string) => {
                    map.set(key, new TestObject());
                });

                expect(map.keys()).toEqual(keys);
            });
        });

        describe('values', () => {

            it('returns all values in the order they where inserted', () => {

                var values: TestObject[] = [new TestObject(), new TestObject(), new TestObject(), new TestObject(), new TestObject()];

                values.forEach((value: string, index: number) => {
                    map.set(String(index), value);
                });

                expect(map.values()).toEqual(values);
            });
        });

        describe('forEach', () => {

            it('iterate over supplied handler', () => {

                source = [['1', new TestObject()], ['2', new TestObject()]];
                map = new Map<string,TestObject>(source);

                let handler = (value:TestObject, key: string): void => {},
                    spy = jasmine.createSpy('handler', handler).and.callThrough();

                map.forEach(spy);

                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy.calls.argsFor(0)).toEqual([source[0][1], source[0][0]]);
                expect(spy.calls.argsFor(1)).toEqual([source[1][1], source[1][0]]);
            });
        });

        describe('clear', () => {

            it('clear all key value pairs in the map', () => {

                source = [['1', new TestObject()], ['2', new TestObject()]];
                map = new Map<string,TestObject>(source);

                expect(map.size).toBe(2);

                map.clear();

                expect(map.size).toBe(0);
                expect(map.get('1')).toBeUndefined();
                expect(map.has('1')).toBe(false);
            });
        });
    });
});
