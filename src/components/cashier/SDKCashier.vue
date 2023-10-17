<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import PacypayCheckout from "@/js/pacypay";
import InfoCard from "@/components/card/InfoCard.vue";
import {makePayment} from "@/utils/util";

let alertText = '';
const showSuccess = ref(false);
const showError = ref(false);

// Token下单
const requestExample = ref({
      "merchantNo": "800209",
      "merchantTxnId": "363722844551",
      "merchantTxnTime": null,
      "merchantTxnTimeZone": null,
      "merchantCustId": "custId_1640247522000",
      "productType": "CARD",
      "subProductType": "TOKEN",
      "txnType": "SALE",
      "orderAmount": "10",
      "orderCurrency": "USD",
      "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"notifyUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"USD\\\"},{\\\"name\\\":\\\"macBook\\\",\\\"price\\\":\\\"1234.00\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1700077023031386112}",
      "shippingInformation": "{\"firstName\":\"\",\"lastName\":\"\",\"phone\":\"\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"\",\"address\":\"\",\"country\":\"US\",\"province\":\"\",\"city\":\"\"}",
      "billingInformation": "{\"firstName\":\"\",\"lastName\":\"\",\"phone\":\"\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"\",\"address\":\"\",\"country\":\"US\",\"province\":\"\",\"city\":\"\"}",
      "sign": ""
    }
);

let txnId = '';

onMounted(async () => {
  const transactionId = await makePayment('/api/v1/sdkTxn/doTransaction', requestExample.value).then(res => {
    const {respCode, respMsg} = res;

    if (respCode === '20000') {
      return res.data.transactionId
    } else {
      console.log(respMsg)
    }
  })

  new PacypayCheckout(transactionId
      , {
        locale: 'zh-cn', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
        environment: 'sandbox', // sandbox、production
        config: {
          subProductType: 'TOKEN', // DIRECT-直接支付，TOKEN-token绑卡并支付（必须和下单接口中subProductType值保持一致）
          checkoutTheme: 'light', // light、dark
          customCssURL: '', // 自定义样式链接地址，配置该值后，checkoutTheme 则无效
          variables: {
            "colorBackground": "black", // 主题背景色
            "colorPrimary": "red", // 主题色，如输入框高亮、光标颜色
            "colorText": "white", // 字体颜色
            "colorDanger": "#FF1493", // 错误提示颜色
            "borderRadius": "2px", // 输入框角度
            "fontSizeBase": "16px", // 基础字体大小，会按照该基准进行缩放
            "fontFamily": "Arial, sans-serif", // 字体样式
          },
// 如果想自定义所有样式则只用配置styles. checkoutTheme,customCssURL,variables都可以不传
// 详情请看styles属性说明
          styles: {
            ".pacypay-checkout__button--pay": { // 支付按钮样式
              "background-color": "red",
            },
          }
        },
        onPaymentCompleted: function (res) {
          //成功支付后回调方法
          const txtInfo = res.data; // 返回交易结果详情
          const respCode = res.respCode; // 响应码
          const respMsg = res.respMsg; // 响应信息
          if (respCode === '20000') { // respCode 为 20000 表示交易正常
            switch (txtInfo.status) { // 交易状态判断
              case 'S': // status 为 'S' 表示成功
                // 支付最终状态以异步通知结果为准
                alertText = respMsg;
                showError.value = false
                showSuccess.value = true
                break;
              case 'R': // status 为 'R' 表示需要3ds验证
                // 当交易状态为 R 时，商户需要重定向到该URL完成部分交易，包括3ds验证
                window.location.href = txtInfo.redirectUrl;
                break;
            }
          } else {
            // 交易失败
            showSuccess.value = false
            showError.value = true
            alertText = respMsg;
          }
        },
        onError: function (err) {
          //支付异常回调方法
          console.log(err);
        }
      })
})
</script>

<template>
  <div class="js-sdk-cashier card-container border-top rounded-2">
    <InfoCard card-header="JS-SDK收银台"
              card-text="测试卡号信息如下：`4000 0209 5159 5032`，`12/25`，`123`"
              card-title="">
    </InfoCard>
    <div v-if='showSuccess' class="alert alert-primary text-center" role="alert">
      {{ alertText }}
    </div>
    <div v-if="showError" class="alert alert-danger text-center" role="alert">
      {{ alertText }}
    </div>
    <div id='pacypay_checkout'></div>
  </div>
</template>

<style scoped>

</style>