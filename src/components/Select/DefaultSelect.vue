<script setup>

defineProps({
  ariaLabel: {
    type: String,
    required: true
  },
  selectClass: {
    type: String,
    required: true
  }
})
</script>

<template>
  <select :aria-label="ariaLabel" :class="selectClass">
    <slot></slot>
  </select>
</template>

<style scoped>

</style>