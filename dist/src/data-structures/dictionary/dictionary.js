"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this._dictionary = {};
        this._order = [];
    }
    Dictionary.prototype.addItem = function (key, item) {
        if (this._dictionary[key]) {
            console.warn("Dictionary Error : addItem(" + key + ", item). there is another item with key: " + key + " ");
        }
        else {
            this._dictionary[key] = item;
            this._order.push(key);
        }
        return item;
    };
    Dictionary.prototype.has = function (key) {
        return !!this._dictionary[key];
    };
    Dictionary.prototype.getByKey = function (key) {
        return this._dictionary[key];
    };
    Dictionary.prototype.getByKeys = function (keys) {
        var items = new Dictionary();
        for (var key in this._dictionary) {
            if (keys.indexOf(key) > -1) {
                items.addItem(key, this._dictionary[key]);
            }
        }
        return items;
    };
    Dictionary.prototype.getArrayByKeys = function (keys) {
        var _this = this;
        return keys.map(function (key) { return _this.getByKey(key); });
    };
    Dictionary.prototype.toArray = function () {
        var _this = this;
        return this._order.map(function (key) { return _this._dictionary[key]; });
    };
    Dictionary.prototype.forEach = function (fn) {
        return this.toArray().forEach(fn);
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=dictionary.js.map