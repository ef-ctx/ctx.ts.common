import {
    Factory
} from './Factory';

describe('Factory', () => {

    var factory: MockFactory;

    beforeEach(() => {
        factory = new MockFactory();
    });

    it('be ok ', () => {
        expect(true).toBeTruthy();
    });

    describe('[ create(data) ]', () => {

        describe('WHEN data is an array', () => {

            var instances: Mock[],
                data: any = [{
                    foo: 'foo 1',
                    bar: 'bar 1'
                }, {
                    foo: 'foo 2',
                    bar: 'bar 2'
                }];

            beforeEach(() => {
                instances = factory.create(data);
            });

            it('returns an array of instances of the configured generic', () => {
                expect(instances.length).toBe(2);
                expect(instances[0] instanceof Mock).toBeTruthy();
                expect(instances[0].foo).toBe('foo 1');
                expect(instances[1].bar).toBe('bar 2');
            });
        });

        describe('WHEN data is an object', () => {

            var instances: Mock[],
                data: any = [{
                    foo: 'foo 1',
                    bar: 'bar 1'
                }];

            beforeEach(() => {
                instances = factory.create(data);
            });

            it('returns an array with the instance of the configured generic', () => {
                expect(instances.length).toBe(1);
                expect(instances[0] instanceof Mock).toBeTruthy();
                expect(instances[0].foo).toBe('foo 1');
            });
        });
    });

    describe('overriding [ createInstance(data) ]', () => {

        var instances: Mock[],
            data: any = [{
                foo: 'foo 1',
                bar: 'bar 1'
            }];

        beforeEach(() => {
            factory = new MockFactory2();
            instances = factory.create(data);
        });

        it('use the overriden method intstead of the inherited one', () => {
            expect(instances.length).toBe(1);
            expect(instances[0] instanceof Mock).toBeTruthy();
            expect(instances[0].foo).toBe('foo 1&foo 1');
        });
    });
});

class MockFactory extends Factory < Mock > {
    constructor() {
        super(Mock);
    }
}

class MockFactory2 extends Factory < Mock > {
    constructor() {
        super(Mock);
    }

    public createInstance(data: any) {
        data.foo += '&' + data.foo;
        return new Mock(data);
    }
}

class Mock {
    public foo: string = 'bar';
    public bar: string = 'baz';

    constructor(data: any) {
        this.foo = data.foo || this.foo;
        this.bar = data.bar || this.bar;
    }
}
