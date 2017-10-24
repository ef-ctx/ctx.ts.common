import { Observable } from 'rxjs';
import { Hook } from '../.';
export interface HookBypassCondition<I> {
    (input: I): boolean;
}
export interface HooksProcessor {
    execute<I, O>(input: I | Observable<I>, hooks: Hook<I, I | O>[], bypassCondition?: HookBypassCondition<I | O>): Observable<O>;
}
