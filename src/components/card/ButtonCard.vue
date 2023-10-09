<script setup>
// 收银台请求体
import request from "@/utils/request";
import {concatObjectValues, hash, objectValuesToString} from "@/utils/util";
import {ref} from "vue";

defineProps({
  buttonText: String
})

const requestExample = ref({
      billingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      cardInfo: {
        holderName: 'CL BRW2'
      },
      merchantNo: '800209',
      merchantTxnId: '',
      merchantTxnTime: '2022-03-08 16:04:07',
      merchantTxnTimeZone: '+08:00',
      orderAmount: '35',
      orderCurrency: 'USD',
      productType: 'CARD',
      shippingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      subProductType: 'DIRECT',
      txnOrderMsg: {
        appId: '1700077023031386112',
        returnUrl: 'https://www.ronhan.com/',
        products: '[{"price":"110.00","num":"1","name":"iphone11","currency":"USD"}]'
      },
      txnType: 'SALE',
      sign: '6e9b951d6d56d03f236a6ae6af1dce5e2546c06c1c555ee95b86aed09e713a8c'
    }
);

const submitForm = async () => {
  // Handle form submission logic here

  // 每次提交前清空sign
  requestExample.value.sign = ''

  // 生成随机merchantTxnId
  requestExample.value.merchantTxnId = '' + Math.floor(Math.random() * 1000000000000);

  // 获取签名
  const tmp = concatObjectValues(requestExample.value);
  requestExample.value.sign = await hash(tmp, '');

  // 生成签名后的请求体
  const req = objectValuesToString(requestExample.value)

  // 提交表单
  request.post('/api/txn/payment', req).then(res => {
    console.log(res)
    const {respCode, respMsg} = res;
    if (respCode === '20000') {
      const url = res.data.redirectUrl
      window.open(url)
    } else {
      alert(respMsg)
    }
  });
};
</script>

<template>
  <div class="card-container">
    <slot name="card"/>
    <button class="btn btn-dark" @click="submitForm">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
}

.card-container button {
  align-self: center;
}
</style>