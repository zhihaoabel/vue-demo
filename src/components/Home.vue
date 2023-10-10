<script setup>

import InfoCard from "@/components/card/InfoCard.vue";
import ButtonCard from "@/components/card/ButtonCard.vue";
import SDKCashier from "@/components/cashier/SDKCashier.vue";
import CardKitchenSink from "@/components/card/CardKitchenSink.vue";
</script>

<template>
  <!--  跳转收银台-->
  <ButtonCard buttonText="Pay Now">
    <template #card>
      <InfoCard #card cardHeader="Onerway收银台"
                cardText="点击下方的支付按钮就会跳转Pacypay收银台"
                cardTitle=""/>
    </template>
  </ButtonCard>

  <!--  JS-SDK收银台-->
  <SDKCashier/>

  <!--  两方接口支付-->
  <CardKitchenSink/>
</template>

<style scoped>

</style>