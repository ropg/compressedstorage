export = CompressedStorage;
/**
 * Description
 * @param {Storage|any} [store=window.localStorage] - Where compressed strings go
 * @returns {Object} - Object that your code talks to
 */
declare function CompressedStorage(store?: Storage | any): Object;
