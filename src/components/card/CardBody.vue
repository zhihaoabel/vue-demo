<script setup>

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
  },
  cardHeaderClass: {
    type: String,
    default: 'card-header',
    required: true
  },
  cardClass: {
    type: String,
    default: 'card-body',
    required: true
  }
})
</script>

<template>
  <div id="payment-method-container">
    <div :class="cardHeaderClass">{{ cardHeader }}
      <slot name="img"></slot>
    </div>
    <div :class="cardClass">
      <h6 class="card-title">{{ cardTitle }}</h6>
      <p class="card-text">{{ cardText }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-text {
  font-size: 12px;
  color: var(--vt-c-text-light-2);
}
</style>
