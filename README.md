[![npm version](https://badge.fury.io/js/compressedstorage.svg)](https://badge.fury.io/js/compressedstorage) [![license](https://badgen.net/github/license/ropg/compressedstorage)](https://github.com/ropg/compressedstorage/blob/main/LICENSE) [![github](https://img.shields.io/github/last-commit/ropg/compressedstorage)](https://github.com/ropg/compressedstorage)

# CompressedStorage

**Transparent proxy to compress data in localStorage or sessionStorage**



&nbsp;

### Why

The `window.localStorage` and `window.sessionStorage` interfaces are subject to browser-dependent storage limits, which you might be able to avoid using compression provided by [`lz-string`](https://www.npmjs.com/package/lz-string). Also, there may be an advantage in users not being able to immediately see what's being stored. *(**Warning**: Mild obfuscation only, does not provide actual security.)*

&nbsp;

### Get started

If you're using a development framework, you can probably install this in the project directory with:

```text
npm install compressedstorage --save
```

And then in your code, simply say:

```js
const CompressedStorage = require('compressedstorage');
```

If you're on your own, you might try:

```js
<script type="module">
import CompressedStorage from 'https://cdn.skypack.dev/compressedstorage';

// [[ your code here ]]

</script>
```

Either way, once you have access to the function provided by this module, you can use it to create your transparent storage object like this:

```js
// Defaults to using window.localStorage, but takes any other object as argument
// e.g.:   const myStore = CompressedStorage(window.sessionStorage)
const myStore = CompressedStorage()

const myString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo`

myStore.test = myString

console.log(window.localStorage.test)
// '٣氳䅬஀Ȥ堡悇Ž〩䐡宦◠஬Ĭ偠›ణౠބ䊊޲䰳橇ঊ燰᳦ȶ⅊䜈ㅐŠ⇡≥Ȣ▴ɼ㻝ᷰ凲ᅤ▸䀱尤Ⴢ䱙ႁ⌷珌≤⁃䕑Zఠ啂࢔熁䐲⡞l੠
// ܇玥ᅲ巘ゔ၄ĸԢ℠Đ䆢砩䐤㢚పର攫↤ᢹ䀳缘ዂㄫ䔱щ䨴㫱ℵᡠ  '

console.log(myStore.test == myString)
// true
```

&nbsp;

### What it does

* Object works like the `Storage` object that it proxies for, so these are equivalent:
    * `myStore.setItem('key', 'value')`
    * `myStore['key'] = 'value'`
    * `myStore.key = 'value'`

* Provides transparent access to the methods provided on underlying storage:
    * `clear()`
    * `key(n)`
    * etc.

* Strings in underlying storage that were not compressed are passed transparently on read.

&nbsp;

### What it doesn't do

* This is string-based storage, like `localStorage` or `sessionStorage` themselves. If you want to store objects, you'll need to `JSON.stringify` them. Better yet, use my [`StorageObject`🔗&nbsp;](https://github.com/ropg/storageobject) with `CompressedStorage` as its back-end to keep an arbitrary-depth object in sync with what's in storage. It's debounced (so you don't take a performance hit if you're writing to large objects very often) and you can have multiple running in parallel.

&nbsp;

### Good to know

* No dependency hell. The only depndency is [`lz-string`](https://www.npmjs.com/package/lz-string) for the compression/decompression, which does not have any further dependencies.
