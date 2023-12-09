<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css' // choose your style
export default {
  name: "Marked",
  data() {
    return {
      code: `
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  },
  "hobbies": ["reading", "hiking", "coding"]
}
`,
      copySuccess: false,
      isCopied: false,
    }
  },
  computed: {},
  mounted() {
    let blocks = this.$el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.$refs.codeBlock.innerText)
          .then(() => {
            this.copySuccess = true;
            this.isCopied = true;
          }, err => {
            console.error('Could not copy text: ', err);
          });
    }
  }
}
</script>

<template>
  <div class="code-container">
    <pre><code class="json" v-html="code" ref="codeBlock"></code></pre>
    <button :class="{ 'copy-button': true, 'copied': isCopied }" @click="copyCode">📋</button>
    <div v-if="copySuccess" class="copy-success">copied</div>
  </div>
</template>

<style scoped>
.code-container {
  position: relative;
}

pre {
  background-color: black;
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.copy-button.copied {
  cursor: default;
}

.copy-success {
  position: absolute;
  top: 0;
  left: 5px;
  background: none;
  font-size: 1em;
  color: #b0afaf;
}
</style>
