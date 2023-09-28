<script setup>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const editor = new Editor({
  el: document.querySelector('#editor'),
  height: '1000px',
  initialEditType: 'markdown',
  previewStyle: 'vertical'
});// editor's Style

</script>

<template>
  <div id="editor"></div>
</template>

<style scoped>
</style>