<script setup>

import {ref, defineProps} from "vue";

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
  showContent: {
    type: Boolean,
    required: true
  },
});

const emit = defineEmits(['update:showContent', 'updateInput']);

const showContent = ref(false);

const updateInput = () => {
  if (!props.showContent) {
    // 移除所有input的checked属性
    document.querySelectorAll('.list-group-item .radio-input').forEach(item => {
      item.removeAttribute('checked');
    });
    // 将所有input的value设为false
    document.querySelectorAll('.list-group-item .radio-input').forEach(item => {
      item.setAttribute('value', false);
    });
    // 给id为 credit-debit-card-radio 的input更新value属性
    document.querySelector(`#${props.paymentClass}`).setAttribute('checked', 'checked');
    console.log(document.querySelector(`#${props.paymentClass}`), 'paymentClass');
    emit('update:showContent', true);
  }
}

</script>

<template>
  <div :class="`${props.paymentClass} local-payment d-flex align-items-center justify-content-between`"
       @click="updateInput">
    <div :class="`${props.paymentClass}-title d-flex`">
      <input :id="props.paymentClass" :aria-label="props.ariaLabelText" :value=showContent
             class="radio-input align-self-center" type="radio"
             @input="showContent=$event.target.value">
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
.local-payment {
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}
</style>