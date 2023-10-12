<script setup>
// 收银台请求体
import {makePayment} from "@/utils/util";
import {ref} from "vue";

defineProps({
  buttonText: String
})

const uri = '/api/txn/payment';
const requestExample = ref({
      billingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      cardInfo: {},
      merchantCustId: 'custId_1640247522000',
      merchantNo: '800209',
      merchantTxnId: '', //随机生成
      merchantTxnTime: '2022-03-08 16:04:07',
      merchantTxnTimeZone: '+08:00',
      orderAmount: '35',
      orderCurrency: 'USD',
      productType: 'CARD',
      shippingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      subProductType: 'TOKEN',
      txnOrderMsg: {
        appId: '1700077023031386112',
        returnUrl: 'https://www.ronhan.com/',
        products: '[{"price":"110.00","num":"1","name":"iphone11","currency":"USD"}]'
      },
      txnType: 'SALE',
      sign: '6e9b951d6d56d03f236a6ae6af1dce5e2546c06c1c555ee95b86aed09e713a8c'
    }
);

// 发起支付
makePayment(uri, requestExample)


</script>

<template>
  <div class="card-container border-top rounded-2">
    <slot name="card"/>
    <button class="btn btn-dark" @click="makePayment">{{ buttonText }}</button>
  </div>
</template>

<style scoped>

</style>