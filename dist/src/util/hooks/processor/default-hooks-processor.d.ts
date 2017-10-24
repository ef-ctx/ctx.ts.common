import { Observable } from 'rxjs';
import { HooksProcessor } from '../.';
export declare class DefaultHooksProcessor implements HooksProcessor {
    execute(input: any, hooks: any, bypassCondition?: any): Observable<any>;
    private _executeHook(input, hook, bypassCondition?);
    private _isObservable(arg);
    private _shouldBypass<O>(input, bypassCondition?);
}
