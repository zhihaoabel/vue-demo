<script setup>
import {ref} from 'vue';
import FormPlainField from "@/views/form/FormPlainInput.vue";

const formData = ref({
      billingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      merchantNo: '800209',
      merchantTxnId: '1654675447655',
      merchantTxnTime: '2022-03-08 16:04:07',
      merchantTxnTimeZone: '+08:00',
      orderAmount: '35',
      orderCurrency: 'USD',
      productType: 'CARD',
      cardInfo: {
        holderName: 'CL BRW2'
      },
      shippingInformation: {
        country: 'US',
        email: 'test@qq.com'
      },
      subProductType: 'DIRECT',
      txnOrderMsg: {
        appId: '1700077023031386112',
        returnUrl: 'http://v1-demo.test.com/',
        products: '[{"price":"110.00","num":"1","name":"iphone11","currency":"USD"}]'
      },
      txnType: 'SALE',
      sign: ''
    }
);

const submitForm = () => {
  formData.value.merchantTxnId++;
  // Handle form submission logic here
  console.log('Form submitted:', formData.value);
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
        <input id="country" v-model="formData.billingInformation.country" class="mx-lg-3 form-input" type="text"/>
      </div>

      <div class="mb-3 form-group">
        <label class="form-label" for="email">Email:</label>
        <input id="email" v-model="formData.billingInformation.email" class="mx-lg-3 form-input" type="email"/>
      </div>
    </div>

    <!-- Merchant Information -->
    <FormPlainField v-model="formData.merchantNo" fieldId="merchantNo" fieldLabel="Merchant No" fieldType="text"/>

    <FormPlainField v-model="formData.merchantTxnId" fieldId="merchantTxnId" fieldLabel="Merchant Transaction ID"
                    fieldType="text"/>

    <FormPlainField v-model="formData.merchantTxnTime" fieldId="merchantTxnTime" fieldLabel="Merchant Transaction Time"
                    fieldType="text"/>

    <FormPlainField v-model="formData.merchantTxnTimeZone" fieldId="merchantTxnTimeZone"
                    fieldLabel="Merchant Transaction Time Zone" fieldType="text"/>

    <FormPlainField v-model="formData.orderAmount" fieldId="orderAmount" fieldLabel="Order Amount"
                    fieldType="text"/>

    <FormPlainField v-model="formData.orderCurrency" fieldId="orderCurrency" fieldLabel="Order Currency"
                    fieldType="text"/>

    <FormPlainField v-model="formData.productType" fieldId="productType" fieldLabel="Product Type" fieldType="text"/>

    <!-- Card Information -->
    <div>
      <fieldset>
        <h6>Card Information</h6>
        <div class="mb-3 form-group">
          <label class="form-label" for="holderName">Holder Name:</label>
          <input id="holderName" v-model="formData.cardInfo.holderName" class="mx-lg-3 form-input" type="text"/>
        </div>
      </fieldset>
    </div>

    <!-- Shipping Information -->
    <div>
      <fieldset>
        <h6>Shipping Information</h6>

        <div class="mb-3 form-group">
          <label class="form-label" for="shippingCountry">Country:</label>
          <input id="shippingCountry" v-model="formData.shippingInformation.country" class="mx-lg-3 form-input"
                 type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="shippingEmail">Email:</label>
          <input id="shippingEmail" v-model="formData.shippingInformation.email" class="mx-lg-3 form-input"
                 type="email"/>
        </div>
      </fieldset>
    </div>

    <FormPlainField v-model="formData.subProductType" fieldId="subProductType" fieldLabel="Sub Product Type"
                    fieldType="text"/>

    <!-- Transaction Order Message -->
    <div>
      <fieldset>
        <h6>Transaction Order Message</h6>
        <div class="mb-3 form-group">
          <label class="form-label" for="appId">App ID:</label>
          <input id="appId" v-model="formData.txnOrderMsg.appId" class="mx-lg-3 form-input" type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="returnUrl">Return URL:</label>
          <input id="returnUrl" v-model="formData.txnOrderMsg.returnUrl" class="mx-lg-3 form-input" type="text"/>
        </div>

        <div class="mb-3 form-group">
          <label class="form-label" for="products">Products:</label>
          <textarea id="products" v-model="formData.txnOrderMsg.products" class="mx-lg-3 form-input" type="text">
          </textarea>
        </div>
      </fieldset>
    </div>

    <FormPlainField v-model="formData.txnType" fieldId="txnType" fieldLabel="Txn Type" fieldType="text"/>

    <FormPlainField v-model="formData.sign" fieldId="sign" fieldLabel="Sign" fieldType="text"/>

    <button class="submit-button border-primary rounded-2" type="submit">Submit</button>

    <pre>{
    "respCode": "20000",
    "respMsg": "Success",
    "data": {
        "transactionId": "1710930229176258560",
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