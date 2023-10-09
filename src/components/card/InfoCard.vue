<script setup>

import {defineProps} from 'vue'

defineProps({
  cardHeader: {
    type: String,
    required: true
  },
  cardTitle: {
    type: String,
    required: true
  },
  cardText: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card border-info mb-3" style="max-width: 18rem;">
    <div class="card-header">{{ cardHeader }}</div>
    <div class="card-body text-info">
      <h5 class="card-title">{{ cardTitle }}</h5>
      <p class="card-text">{{ cardText }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>