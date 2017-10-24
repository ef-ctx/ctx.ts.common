import Spy = jasmine.Spy;

import {Observable, AsyncSubject} from 'rxjs';

import {Hook, HooksProcessor, HookBypassCondition, DefaultHooksProcessor} from '../.';


class TypeA {
    value: number = 0;
}

class TypeB {
    status: number;
}


class TestHook implements Hook<TypeA,TypeA> {

    execute(input: TypeA): TypeA {

        input.value += 10;

        return input;
    }
}

class AsyncTestHook implements Hook<TypeA,TypeA> {

    execute(input: TypeA): Observable<TypeA> {

        var source: AsyncSubject<TypeA> = new AsyncSubject();

        input.value += 1000;

        setTimeout(() => {
            source.next(input);
            source.complete();
        }, 2000);

        return source.asObservable();
    }
}

class BypassConditionTriggerHook implements Hook<TypeA,TypeB> {

    execute(input: TypeA): TypeB {
        return new TypeB();
    }
}


describe('HooksProcessor', () => {

    var processor: DefaultHooksProcessor,
        hooks: any[],
        input: any;

    beforeEach(() => {

        processor = new DefaultHooksProcessor();

        hooks = [
            new TestHook(),
            new TestHook(),
            new TestHook(),
            new TestHook()
        ];

        input = new TypeA();
    });

    describe('execute', () => {

        it('sequentially process the supplied hooks and return the updated input', (done: Function) => {

            processor.execute(input, hooks)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(40);
                    done();
                });
        });

        it('sequentially process the supplied hooks and handle async hooks', (done: Function) => {

            hooks.splice(2, 0, new AsyncTestHook());

            processor.execute(input, hooks)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(1040);
                    done();
                });
        });

        it('ignores any subsequent hooks when supplied with a bypass condition that fails', (done: Function) => {

            var bypassCondition: HookBypassCondition<TypeA|TypeB> = (input: TypeA|TypeB) => {
                return input instanceof TypeB;
            };

            var bypassTestHooks: Hook<TypeA,TypeA|TypeB>[] = hooks;

            bypassTestHooks.splice(3, 0, new BypassConditionTriggerHook());

            var spy: Spy = spyOn(hooks[4], 'execute').and.callThrough();

            processor.execute(input, bypassTestHooks, bypassCondition)
                .subscribe((output: TypeB) => {
                    expect(output).toEqual(jasmine.any(TypeB));
                    expect(input.value).toBe(30);
                    expect(spy.calls.any()).toBe(false);
                    done();
                });
        });
    });
});
