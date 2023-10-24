<script setup>
import TreeMenu from "@/components/menu/TreeMenu.vue";

defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
})

</script>

<template>
  <div v-for="menuItem in menuItems">
    <span :style="{paddingLeft: depth * 15 + 24 + 'px'}">
      <router-link :to="'' + menuItem.path">{{ menuItem.name }}</router-link>
    </span>
    <tree-menu v-if="menuItem.children" :menu-items="menuItem.children" :depth="depth + 1"/>
  </div>
</template>

<style scoped>

</style>
