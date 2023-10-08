<script setup>
defineProps({
  fieldId: {
    type: String,
    required: true
  },
  fieldLabel: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-3 form-group">
    <label :for="fieldId" class="form-label">{{ fieldLabel }}: </label>
    <input :id="fieldId" :type="fieldType" :value="modelValue" class="mx-lg-3 form-input"
           @input="$emit('update:modelValue')"/>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
}

.form-label {
  margin-right: 10px;
}

.form-input {
  flex-grow: 1;
}

</style>