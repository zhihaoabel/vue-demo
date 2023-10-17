<script setup>

import {ref} from "vue";

const props = defineProps({
  paymentClass: {
    type: String,
    required: true
  },
  ariaLabelText: {
    type: String,
    required: true
  },
  paymentName: {
    type: String,
    required: true
  },
})

const showContent = ref(false);

const checkRadio = (() => {
  if (!showContent.value) {
    showContent.value = true
    // 给id为 radio-input 的input添加checked属性
    const id = props.paymentClass + '-radio';
    document.getElementById(id).setAttribute('checked', 'checked');
  }
})
</script>

<template>
  <div :class="`${props.paymentClass} d-flex align-items-center justify-content-between`"
       @click="checkRadio">
    <div :class="`${props.paymentClass}-title d-flex`">
      <input :id="props.paymentClass" v-model="showContent"
             :aria-label="props.ariaLabelText" class="radio-input align-self-center" type="radio">
      <span class="mx-1">
        <slot name="presiding-icon"/>
      </span>
      <span>{{ props.paymentName }}</span>
    </div>
    <span class="payment-icons">
      <slot name="payment-icons"/>
    </span>
  </div>

  <slot/>
</template>

<style scoped>

</style>