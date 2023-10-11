<script setup>

import {defineProps} from 'vue'
import CardBody from "@/components/card/CardBody.vue";

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
  <div class="card border-info mb-3">
    <div class="card-header">{{ cardHeader }}</div>
    <CardBody card-class="card-body"
              card-header=""
              card-header-class=""
              :card-text="cardText"
              :card-title="cardTitle"/>
  </div>
</template>

<style scoped>

</style>