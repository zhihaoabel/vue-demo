<script setup>
import {ref} from 'vue';

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
  // Handle form submission logic here
  console.log('Form submitted:', formData.value);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- Billing Information -->
    <div >
      <fieldset>
        <legend>Billing Information</legend>
        <div class="mb-3">
          <label for="country">Country:</label>
          <input id="country" v-model="formData.billingInformation.country" type="text"/>
        </div>

        <div class="mb-3">
          <label for="email">Email:</label>
          <input id="email" v-model="formData.billingInformation.email" type="email"/>
        </div>
      </fieldset>
    </div>

    <!-- Merchant Information -->
    <div class="mb-3">
      <label for="merchantNo">Merchant No:</label>
      <input id="merchantNo" v-model="formData.merchantNo" type="text"/>
    </div>

    <div class="mb-3">
      <label for="merchantTxnId">Merchant Transaction ID:</label>
      <input id="merchantTxnId" v-model="formData.merchantTxnId" type="text"/>
    </div>

    <div class="mb-3">
      <label for="merchantTxnTime">Merchant Transaction Time:</label>
      <input id="merchantTxnTime" v-model="formData.merchantTxnTime" type="text"/>
    </div>

    <div class="mb-3">
      <label for="merchantTxnTimeZone">Merchant Transaction Time Zone:</label>
      <input id="merchantTxnTimeZone" v-model="formData.merchantTxnTimeZone" type="text"/>
    </div>

    <div class="mb-3">
      <label for="orderAmount">Order Amount:</label>
      <input id="orderAmount" v-model="formData.orderAmount" type="text"/>
    </div>

    <div class="mb-3">
      <label for="orderCurrency">Order Currency:</label>
      <input id="orderCurrency" v-model="formData.orderCurrency" type="text"/>
    </div>

    <div class="mb-3">
      <label for="productType">Product Type:</label>
      <input id="productType" v-model="formData.productType" type="text"/>
    </div>

    <!-- Card Information -->
    <div>
      <fieldset>
        <legend>Card Information</legend>
        <div class="mb-3">
          <label for="holderName">Holder Name:</label>
          <input id="holderName" v-model="formData.cardInfo.holderName" type="text"/>
        </div>
      </fieldset>
    </div>

    <!-- Shipping Information -->
    <div>
      <fieldset>
        <legend>Shipping Information</legend>
        <div class="mb-3">
          <label for="shippingCountry">Country:</label>
          <input id="shippingCountry" v-model="formData.shippingInformation.country" type="text"/>
        </div>

        <div class="mb-3">
          <label for="shippingEmail">Email:</label>
          <input id="shippingEmail" v-model="formData.shippingInformation.email" type="email"/>
        </div>
      </fieldset>
    </div>

    <div class="mb-3">
      <label for="subProductType">Sub Product Type:</label>
      <input id="subProductType" v-model="formData.subProductType" type="text"/>
    </div>

    <!-- Transaction Order Message -->
    <div class="mb-3">
      <fieldset>
        <legend>Transaction Order Message</legend>
        <div>
          <label for="appId">App ID:</label>
          <input id="appId" v-model="formData.txnOrderMsg.appId" type="text"/>
        </div>

        <div>
          <label for="returnUrl">Return URL:</label>
          <input id="returnUrl" v-model="formData.txnOrderMsg.returnUrl" type="text"/>
        </div>

        <div>
          <label for="products">Products:</label>
          <input id="products" v-model="formData.txnOrderMsg.products" type="text"/>
        </div>
      </fieldset>
    </div>

    <div class="mb-3">
      <label for="txnType">Transaction Type:</label>
      <input id="txnType" v-model="formData.txnType" type="text"/>
    </div>

    <div class="mb-3">
      <label for="sign">Sign:</label>
      <input id="sign" v-model="formData.sign" type="text"/>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
label {
  color: #9b8e8e;

}
</style>