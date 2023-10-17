<script setup>
import {ref} from "vue";

import IconWallet from "@/components/icons/IconWallet.vue";
import IconVisa from "@/components/icons/IconVisa.vue";
import IconMasterCard from "@/components/icons/IconMasterCard.vue";
import IconDiscover from "@/components/icons/IconDiscover.vue";
import ListItem from "@/components/list/ListItem.vue";
import CardBody from "@/components/card/CardBody.vue";
import {makePayment} from "@/utils/util";
import LocalPayment from "@/components/card/LocalPayment.vue";

const uri = ref('/v1/txn/doTransaction');
const requestExample = ref({
  merchantNo: "800209",
  merchantTxnId: "16460431556929",
  merchantTxnTime: "2023-08-28 15:30:30",
  merchantTxnTimeZone: "+08:00",
  productType: "LPMS",
  subProductType: "DIRECT",
  txnType: "SALE",
  orderAmount: "20",
  paymentMode: "WAP",
  osType: "ANDROID",
  orderCurrency: "USD",
  cardInfo: "{\"cardNumber\":\"4918190000000002\",\"cvv\":\"123\",\"month\":\"05\",\"year\":\"24\",\"holderName\":\"abel xx\"}",
  txnOrderMsg: "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"CNY\\\"}]\",\"transactionIp\":\"2600:1700:f0f1:1e30:d08f:c6da:976c:45cd\",\"appId\":1700077023031386112}",
  lpmsInfo: "{\"lpmsType\":\"Alipay+\",\"bankName\":\"\",\"iban\":\"\"}",
  shippingInformation: "{\"firstName\":\"da\",\"lastName\":\"xiong\",\"phone\":\"8522847000\",\"email\":\"shipping@example.com\",\"postalCode\":\"123456\",\"address\":\"HHHEEII\",\"country\":\"MY\",\"province\":\"BABA\",\"city\":\"BALALA\",\"street\":\"1010\",\"number\":\"20-1202\",\"identityNumber\":\"11112223333\",\"birthDate\":\"2020/12/28\"}",
  billingInformation: "{\"firstName\":\"José\",\"lastName\":\"Silva\",\"phone\":\"8522847035\",\"email\":\"jose@example.com\",\"postalCode\":\"61919-230\",\"address\":\"Rua E\",\"country\":\"BR\",\"province\":\"CE\",\"city\":\"Maracanaú\",\"street\":\"1040\",\"identityNumber\":\"853.513.468-93\",\"birthDate\":\"2000/12/20\"}",
  sign: "fc2bff9682515b4d7ba0a247b1308a882cbad4be1eaac9b649f7e3c7bcc59bf1"
});

// 测试卡信息
const cardNumber = ref('4000 0209 5159 5032');
const firstName = ref('Tom');
const lastName = ref('Jerry');
const securityCode = ref('123');
const expirationDate = ref('05/25');
// 卡种信息
const cardInfo = ref({
  cardNumber: cardNumber.value,
  holderName: firstName.value + ' ' + lastName.value,
  cvv: securityCode.value,
  month: expirationDate.value.split('/')[0],
  year: expirationDate.value.split('/')[1],
})

const showCreditCard = ref(false);

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

const checkRadio = ((e) => {
  if (!showCreditCard.value) {
    showCreditCard.value = true
    // 给id为 credit-debit-card-radio 的input添加checked属性
    document.getElementById('credit-debit-card-radio').setAttribute('checked', 'checked')
  }
})
</script>

<template>
  <div class="card-container border-top rounded-2">
    <div class="card">

      <CardBody
          card-class="card-body"
          card-header=""
          card-header-class="card-header"
          card-text="All transactions are secure and encrypted." card-title="Payment method">
        <template #img>
          <img alt="Card image cap" class="card-img-top"
               src="https://sandbox-v3-doc.pacypay.com/images/logo-f18b010b.png">
        </template>
      </CardBody>

      <ul class="list-group list-group-flush">
        <!--信用卡支付-->
        <ListItem list-group-item-class="list-group-item">
          <LocalPayment aria-label-text="credit debit card radio" payment-class="credit-card"
                        payment-name="Credit & Debit Card" @click.native="checkRadio">
            <template #presiding-icon>
              <IconWallet/>
            </template>
            <template #payment-icons>
              <span class="card-visa mx-0"><IconVisa/></span>
              <span class="card-mastercard mx-0"><IconMasterCard/></span>
              <span class="card-discover mx-0"><IconDiscover/></span>
            </template>
          </LocalPayment>
          <template>
            <ListItem v-if="showCreditCard" list-group-item-class="list-group-item bg-body-secondary">
              <form class="g-3">
                <div class="my-3">
                  <input id="cardNumber" v-model="cardNumber" class="col form-control"
                         placeholder="Card Number" type="text">
                </div>

                <div class="row my-3">
                  <div class="col">
                    <input v-model="expirationDate" aria-label="Expiration Date(MM/YY)" class="form-control"
                           placeholder="Expiration Date(MM/YY)" type="text">
                  </div>
                  <div class="col">
                    <input v-model="securityCode" aria-label="Security Code(CVV)" class="form-control"
                           placeholder="Security Code(CVV)" type="text">
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col">
                    <input v-model="firstName" aria-label="First name" class="form-control"
                           placeholder="Cardholder First Name" type="text">
                  </div>
                  <div class="col">
                    <input v-model="lastName" aria-label="Last name" class="form-control"
                           placeholder="Cardholder Last Name"
                           type="text">
                  </div>
                </div>
              </form>
            </ListItem>
          </template>
        </ListItem>

        <!--        本地支付-->
        <button class="btn btn-primary m-3" type="submit" @click="submitForm">Complete Order</button>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.list-group .paymentClass {
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}

.list-group .list-group-item span {
  font-family: 'Malgun Gothic', 'Open Sans', 'Nanum Barun Gothic', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕', '맑은고딕', 'Malgun Gothic', sans-serif;
  font-weight: 600;
}

.list-group .list-group-item input {
  font-size: smaller;
}
</style>