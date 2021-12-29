const { compressToUTF16, decompressFromUTF16 } = require("lz-string");


/**
 * Description
 * @param {Storage|any} [store=window.localStorage] - Where compressed strings go
 * @returns {Object} - Object that your code talks to
 */
function compressedStorage(store = window.localStorage) {
    return new Proxy(store, {
        get(target, name) {
            if (name == "length") {
                return target.length;
            } else if (Object.hasOwn(target, name)) {
                return getter(target, name);
            } else if (name == "getItem") {
                return (name) => getter(target, name);
            } else if (name == "setItem") {
                return (name, value) => setter(target, name, value);
            } else if (typeof target.__proto__[name] === "function") {
                return (...args) => target.__proto__[name].call(target, ...args);
            } else {
                // probably returns undefined
                return target[name];
            }
        },
        set(target, name, value) {
            setter(target, name, value)
            return true;
        },
    });
}

function getter(obj, key) {
    let expanded = decompressFromUTF16(obj[key]);
    if (expanded === null || expanded === '') {
        return obj[key];
    } else {
        return expanded;
    }
}

function setter(obj, key, value) {
    if (value === null) obj[key] = 'null';
    else if (value === undefined) obj[key] = 'undefined';
    else if (value === '') obj[key] = '';
    else obj[key] = compressToUTF16(value.toString());
}

module.exports = compressedStorage;
