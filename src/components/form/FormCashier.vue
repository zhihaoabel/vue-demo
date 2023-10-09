<script setup>
import {ref} from 'vue';
import FormPlainField from "@/components/form/FormPlainInput.vue";
import request from "@/utils/request";
import {concatObjectValues, hash, objectValuesToString} from "@/utils/util";

// 收银台请求体
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
  <form @submit.prevent="submitForm">
    <h4 class="form-title alert-heading">收银台支付</h4>
    <!-- Billing Information -->
    <div class="fieldset">
      <h6>Billing Information</h6>
      <div class="mb-3 form-group">
        <label class="form-label" for="country">Country:</label>
        <input id="country" v-model="requestExample.billingInformation.country" class="mx-lg-3 form-input" type="text"/>
      </div>

      <div class="mb-3 form-group">
        <label class="form-label" for="email">Email:</label>
        <input id="email" v-model="requestExample.billingInformation.email" class="mx-lg-3 form-input" type="email"/>
      </div>
    </div>

    <!-- Merchant Information -->
    <FormPlainField v-model="requestExample.merchantNo" fieldId="merchantNo" fieldLabel="Merchant No" fieldType="text"/>

    <FormPlainField v-model="requestExample.merchantTxnId" fieldId="merchantTxnId" fieldLabel="Merchant Transaction ID"
                    fieldType="text"/>

    <FormPlainField v-model="requestExample.merchantTxnTime" fieldId="merchantTxnTime"
                    fieldLabel="Merchant Transaction Time"
                    fieldType="text"/>

    <FormPlainField v-model="requestExample.merchantTxnTimeZone" fieldId="merchantTxnTimeZone"
                    fieldLabel="Merchant Transaction Time Zone" fieldType="text"/>

    <FormPlainField v-model="requestExample.orderAmount" fieldId="orderAmount" fieldLabel="Order Amount"
                    fieldType="text"/>

    <FormPlainField v-model="requestExample.orderCurrency" fieldId="orderCurrency" fieldLabel="Order Currency"
                    fieldType="text"/>

    <FormPlainField v-model="requestExample.productType" fieldId="productType" fieldLabel="Product Type"
                    fieldType="text"/>

    <!-- Card Information -->
    <div>
      <fieldset>
        <h6>Card Information</h6>
        <div class="mb-3 form-group">
          <label class="form-label" for="holderName">Holder Name:</label>
          <input id="holderName" v-model="requestExample.cardInfo.holderName" class="mx-lg-3 form-input" type="text"/>
        </div>
      </fieldset>
    </div>

    <!-- Shipping Information -->
    <div>
      <fieldset>
        <h6>Shipping Information</h6>

        <div class="mb-3 form-group">
          <label class="form-label" for="shippingCountry">Country:</label>
          <input id="shippingCountry" v-model="requestExample.shippingInformation.country" class="mx-lg-3 form-input"
                 type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="shippingEmail">Email:</label>
          <input id="shippingEmail" v-model="requestExample.shippingInformation.email" class="mx-lg-3 form-input"
                 type="email"/>
        </div>
      </fieldset>
    </div>

    <FormPlainField v-model="requestExample.subProductType" fieldId="subProductType" fieldLabel="Sub Product Type"
                    fieldType="text"/>

    <!-- Transaction Order Message -->
    <div>
      <fieldset>
        <h6>Transaction Order Message</h6>
        <div class="mb-3 form-group">
          <label class="form-label" for="appId">App ID:</label>
          <input id="appId" v-model="requestExample.txnOrderMsg.appId" class="mx-lg-3 form-input" type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="returnUrl">Return URL:</label>
          <input id="returnUrl" v-model="requestExample.txnOrderMsg.returnUrl" class="mx-lg-3 form-input" type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="products">Products:</label>
          <textarea id="products" v-model="requestExample.txnOrderMsg.products" class="mx-lg-3 form-input" type="text">
          </textarea>
        </div>
      </fieldset>
    </div>

    <FormPlainField v-model="requestExample.txnType" fieldId="txnType" fieldLabel="Txn Type" fieldType="text"/>

    <FormPlainField v-model="requestExample.sign" fieldId="sign" fieldLabel="Sign" fieldType="text"/>

    <button class="submit-button border-primary rounded-2" type="submit">Submit</button>

    <pre>{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1710930229176258559",
        "merchantTxnId": "1654675447655",
        "merchantNo": "800209",
        "responseTime": "",
        "txnTime": "",
        "orderAmount": "35.00",
        "orderCurrency": "USD",
        "txnAmount": "",
        "txnCurrency": null,
        "txnTimeZone": null,
        "status": "U",
        "reason": null,
        "redirectUrl": "https://sandbox-v3-checkout.pacypay.com/checkout?key=4f698e88462d4eef8851dcd60edcd276",
        "sign": "20860d04d28cc55dcf950f86a86fa72587106d7004686016d07c44a568a5450a",
        "contractId": "",
        "tokenId": null,
        "eci": null,
        "transactionOrderNo": null,
        "periodValue": null,
        "lpmsType": null,
        "qrCode": null
    }
}</pre>
  </form>

</template>

<style scoped>
* {
  font-size: 14px;
}

form {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.form-group {
  width: 600px;
  display: block;
  margin: 5px 0;
}

.form-label {
  color: #5e6a76;
  display: inline-block;
  text-align: right;
}

.form-input {
  vertical-align: top;
}

.submit-button {
  align-self: center;
  text-align: center;
}

h6 {
  color: #000000;
  font-size: 12px;
  font-weight: 600;
}

</style>
