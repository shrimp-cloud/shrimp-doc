# monaco代码编辑

1. 添加依赖：yarn add monaco-editor
2. 在在需要添加编辑器的页面内引入 编辑器
```
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
```
3. 定义一个 div 用于安置编辑器：
```
<div id="codeEditBox" style="width:100%;height:600px"></div>
```
4. 【页面同步加载】初始化编辑器，并定义一些编辑器操作方法
```
const editor = ref(null);

onMounted(() => {
  initCodeEditor();
});

function initCodeEditor() {
  const codeEditBox = document.getElementById("codeEditBox");
  editor.value = monaco.editor.create(codeEditBox, {
    value: 'TODO get code from your Code Info', // 编辑器初始显⽰⽂字
    language: "javascript", // 语⾔⽀持⾃⾏查阅 demo
    theme: "hc-black", // 官⽅⾃带三种主题 vs, hc-black, or vs-dark
    selectOnLineNumbers: true, // 显⽰⾏号
    roundedSelection: false,
    readOnly: false, // 只读
    cursorStyle: "line", // 光标样式
    automaticLayout: false, // ⾃动布局
    glyphMargin: true, // 字形边缘
    useTabStops: false,
    fontSize: 12, // 字体⼤⼩
    autoIndent: true, // ⾃动布局
    quickSuggestionsDelay: 100, // 代码提⽰延时
  });
  // 监听值的变化
  editor.value.onDidChangeModelContent((event) => {
    getEditorVal()
  });
}

function getEditorVal() {
  const val = toRaw(editor.value).getValue();
  // TODO set val to your save object
}

function setEditorVal(val) {
  toRaw(editor.value).setValue(val);
}

```
5. 【延时加载】编辑器初始化【如dialog】
   - 不能使用 onMounted 来初始化 editor, 因为 `dialog#append-to-body`
   - 在 dialog 是添加 `@opened="initCodeEditor"`
   - 在编辑器容器div上添加 `v-if="dialog.open"`
   - 如上操作，就可以在 dialog 激活时，才初始化 editor, div 成功获取