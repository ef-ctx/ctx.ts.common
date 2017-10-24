import {Observable} from 'rxjs';

import {Hook, HooksProcessor, HookBypassCondition} from '../.';


export class DefaultHooksProcessor implements HooksProcessor {


    public execute(
        input: any,
        hooks: any,
        bypassCondition?: any

    ): Observable<any> {

        if(!this._isObservable(input)) {
            input = Observable.of(input);
        }

        return hooks.reduce((observable: any, hook: any) => {

            return observable.flatMap((input:any) => this._executeHook(input, hook, bypassCondition));

        }, input);
    }

    private _executeHook(
        input: any,
        hook: any,
        bypassCondition?: any

    ): Observable<any> {

        var result: any;

        if(this._shouldBypass<any>(input, bypassCondition)) {

            return Observable.of(input);

        }else{

            result = hook.execute(input);
        }

        return this._isObservable(result) ? result : Observable.of(result);
    }

    private _isObservable(arg: any): boolean {
        return arg instanceof Observable;
    }

    private _shouldBypass<O>(
        input: any,
        bypassCondition?: any

    ): any {

        return bypassCondition && bypassCondition(input);
    }
}
