"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var DefaultHooksProcessor = /** @class */ (function () {
    function DefaultHooksProcessor() {
    }
    DefaultHooksProcessor.prototype.execute = function (input, hooks, bypassCondition) {
        var _this = this;
        if (!this._isObservable(input)) {
            input = rxjs_1.Observable.of(input);
        }
        return hooks.reduce(function (observable, hook) {
            return observable.flatMap(function (input) { return _this._executeHook(input, hook, bypassCondition); });
        }, input);
    };
    DefaultHooksProcessor.prototype._executeHook = function (input, hook, bypassCondition) {
        var result;
        if (this._shouldBypass(input, bypassCondition)) {
            return rxjs_1.Observable.of(input);
        }
        else {
            result = hook.execute(input);
        }
        return this._isObservable(result) ? result : rxjs_1.Observable.of(result);
    };
    DefaultHooksProcessor.prototype._isObservable = function (arg) {
        return arg instanceof rxjs_1.Observable;
    };
    DefaultHooksProcessor.prototype._shouldBypass = function (input, bypassCondition) {
        return bypassCondition && bypassCondition(input);
    };
    return DefaultHooksProcessor;
}());
exports.DefaultHooksProcessor = DefaultHooksProcessor;
//# sourceMappingURL=default-hooks-processor.js.map