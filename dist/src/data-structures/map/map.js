"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = /** @class */ (function () {
    function Map(source) {
        var _this = this;
        this._source = [];
        if (!source) {
            return;
        }
        source.forEach(function (keyValuePair) {
            _this._source.push([keyValuePair[0], keyValuePair[1]]);
        });
    }
    Object.defineProperty(Map.prototype, "size", {
        get: function () { return this._source.length; },
        enumerable: true,
        configurable: true
    });
    Map.prototype.toArray = function () {
        return this._source.map(function (keyValuePair) {
            return [keyValuePair[0], keyValuePair[1]];
        });
    };
    Map.prototype.set = function (key, value) {
        var kvp = this._getKeyValuePairByKey(key);
        if (kvp) {
            kvp[1] = value;
            return;
        }
        this._source.push([key, value]);
    };
    Map.prototype.get = function (key) {
        var kvp = this._getKeyValuePairByKey(key);
        return kvp ? kvp[1] : undefined;
    };
    Map.prototype.delete = function (key) {
        var kvp = this._getKeyValuePairByKey(key);
        if (!kvp) {
            return false;
        }
        this._source.splice(this._source.indexOf(kvp), 1);
        return true;
    };
    Map.prototype.has = function (key) {
        return !!this.get(key);
    };
    Map.prototype.keys = function () {
        return this._source.map(function (keyValuePair) {
            return keyValuePair[0];
        });
    };
    Map.prototype.values = function () {
        return this._source.map(function (keyValuePair) {
            return keyValuePair[1];
        });
    };
    Map.prototype.forEach = function (handler) {
        this._source.forEach(function (keyValuePair) {
            handler(keyValuePair[1], keyValuePair[0]);
        });
    };
    Map.prototype.clear = function () {
        this._source = [];
    };
    //////////////////////////////////////////////////////////////////////
    Map.prototype._getKeyValuePairByKey = function (key) {
        var res = this._source.filter(function (keyValuePair) {
            return keyValuePair[0] === key;
        });
        return res.length ? res[0] : undefined;
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map