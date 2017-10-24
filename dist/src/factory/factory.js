"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory = (function () {
    function Factory(instanceConstructor) {
        this._instaceConstructor = instanceConstructor;
    }
    Factory.prototype.create = function (data) {
        var _this = this;
        return (Array.isArray(data)) ?
            data.map(function (item) { return _this.createInstance(item); }) :
            [this.createInstance(data)];
    };
    Factory.prototype.createInstance = function (data) {
        return new this._instaceConstructor(data);
    };
    return Factory;
}());
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map