<script setup>
import {makePayment} from "@/utils/util";
import {ref} from "vue";
import InfoCard from "./InfoCard.vue";

defineProps({
  buttonText: {
    type: String,
    default: 'Pay Now'
  },

})

const uri = ref('/api/txn/payment');
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
  orderAmount: '250',
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
});

// 非必须验签参数
const filter = ['originTransactionId', 'originMerchantTxnId', 'customsDeclarationAmount',
  'customsDeclarationCurrency', 'paymentMethod', 'walletTypeName', 'periodValue',
  'tokenExpireTime'];

const showAlert = ref(false);

const errorMsg = ref('');

// 发起支付
const submitForm = () => {
  const res = makePayment(uri.value, requestExample.value, filter).then(res => {
    const {respCode, respMsg} = res;
    const {redirectUrl: redirectUrl} = res["data"];
    if (respCode === '20000') {
      // 跳转收银台
      window.open(redirectUrl)
    } else {
      errorMsg.value = respMsg
      showAlert.value = true
    }
  })
};

</script>

<template>
  <div class="card-container border-top rounded-2">
    <el-alert
        v-show="showAlert"
        :description="errorMsg"
        show-icon
        title="System Error"
        type="error"
    />
    <info-card card-text="点击下方的支付按钮即可跳转Pacypay收银台" card-title="" card-header="Onerway收银台"/>
    <button class="btn btn-dark" @click="submitForm">{{ buttonText }}</button>
  </div>
</template>

<style scoped>

</style>
