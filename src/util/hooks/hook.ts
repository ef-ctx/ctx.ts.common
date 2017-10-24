import {Observable} from 'rxjs';


export interface Hook<I,O> {
    id? :string;
    execute(input: I): O|Observable<O>;
}
