"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function merge(target, target1) {
    Object.keys(target1)
        .map(function (key) {
        target[key] = target1[key];
    });
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map