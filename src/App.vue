<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import {ref} from "vue";

const showHome = ref(false);

// const editor = new Editor({
//   el: document.querySelector('#editor'),
//   height: '1000px',
//   initialEditType: 'markdown',
//   previewStyle: 'vertical'
// });// editor's Style
</script>

<template>
  <!--  欢迎页-->
  <div v-if="showHome">
    <header>
      <img alt="Vue logo" class="logo" height="125" src="./assets/logo.svg" width="125"/>

      <div class="wrapper">
        <HelloWorld msg="You did it!"/>
      </div>
    </header>

    <main>
      <TheWelcome/>
    </main>
  </div>
  <router-link to="/">Home</router-link>
  <router-view/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
