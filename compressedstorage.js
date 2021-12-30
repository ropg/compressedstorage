const { compressToUTF16, decompressFromUTF16 } = require("lz-string");


/**
 * Returns the compressing proxy
 * @param {Storage|any} [store=window.localStorage] - Where compressed strings go
 * @returns {Object} - Object that your code talks to
 */
function CompressedStorage(store = window.localStorage) {
    return new Proxy(store, {
        get(target, name) {
            if (name == "length") {
                return target.length;
            } else if (Object.hasOwn(target, name)) {
                return expand(target[name]);
            } else if (name == "getItem") {
                return (name) => expand(target[name]);
            } else if (name == "setItem") {
                return (name, value) => target[name] = compress(value);
            } else {
                return target[name];
            }
        },
        set(target, name, value) {
            target[name] = compress(value);
            return true;
        },
    });
}

function expand(value) {
    let expanded = decompressFromUTF16(value);
    if (
        ["null", "undefined", ""].includes(value) ||
        [null, "", "@@@\x00"].includes(expanded)
    ) return value;
    return expanded;
}

function compress(value) {
    if (value === null) return "null";
    else if (value === undefined) return "undefined";
    else if (value == "") return "";
    else return compressToUTF16(value.toString());
}

module.exports = CompressedStorage;
