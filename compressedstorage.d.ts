export = compressedStorage;
/**
 * Description
 * @param {Storage|any} [store=window.localStorage] - Where compressed strings go
 * @returns {Object} - Object that your code talks to
 */
declare function compressedStorage(store?: Storage | any): Object;
