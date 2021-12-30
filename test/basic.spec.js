const CompressedStorage = require("..");

const store = {};
const proxy = CompressedStorage(store);

string = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

string_compressed = 
"٣氳䅬஀Ȥ堡悇Ž〩䐡宦◠஬Ĭ偠›ణౠބ䊊޲䰳橇ঊ燰᳦ȶ⅊䜈ㅑס≥Ƚ4ִɼ㻝ᷰ凲ᅤ▸䀱尤Ⴢ䱙ႁ⌷珌≤⁃䕑Zఠ啂࢔熁䐲⡞" +
"l-标Հ削巘ゔ၄ĸԢ℠Đ䆢砩䐤㢚పର攫↤ᢹ䀳缘ዂㄫ䔱щ䨴㫱∅ᢪ娦ы䃓怢ᖊ₳瓬炉歫㪽ز© 娛傓Ԑ☐瘪Ŀዡั污" +
"ᄹ綐㋔ⓖᓨ⊣#ᣃ秂䒔勣ఢᢶ偉墾4⦶偀⎤ۣ愘∨൦冨☡⍤ᴀ琡⁴⢲◊戠挜䨾ςᄘ㑶ထ䈂ᠨ̑㴀幃䗔ヲ崭䶡ࢺ罌ƪࡲ⫑丣⇼† ";

const content = {
    test_null: null,
    test_undef: undefined,
    test_empty: "",
    test_string: string,
}
const expected = Object.assign({}, content, {
    test_null: "null",
    test_undef: "undefined"
});

Object.assign(proxy, content);

test("Actually compresses", () => {
    expect(store.test_string).toBe(string_compressed);
});

test("Compressed data reads back", () => {
    expect(JSON.stringify(proxy)).toBe(JSON.stringify(expected));
});

test("Uncompressed data passes through", () => {
    Object.assign(store, expected);
    expect(JSON.stringify(proxy)).toBe(JSON.stringify(expected));
});
