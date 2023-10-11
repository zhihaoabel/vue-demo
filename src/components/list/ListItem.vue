<script setup>
defineProps({
  listGroupItemClass: {
    type: String,
    default: 'list-group-item',
    required: true
  },
})
</script>

<template>
  <li :class="listGroupItemClass">
    <slot/>
  </li>
</template>

<style scoped>

</style>