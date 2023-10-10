<script setup>
import {onMounted} from "vue";
import PacypayCheckout from "@/js/pacypay";
import InfoCard from "@/components/card/InfoCard.vue";

const container = 'pacypay_checkout';
const onPaymentCompleted = null;
const onError = null;
const _initContainerHeight = 0;

onMounted(() => {
  new PacypayCheckout('1701511690996621312', {
    locale: 'zh-cn', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
    environment: 'sandbox', // sandbox、production
    config: {
      subProductType: 'DIRECT', // DIRECT-直接支付，TOKEN-token绑卡并支付（必须和下单接口中subProductType值保持一致）
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
            break;
          case 'R': // status 为 'R' 表示需要3ds验证
            // 当交易状态为 R 时，商户需要重定向到该URL完成部分交易，包括3ds验证
            window.location.href = txtInfo.redirectUrl;
            break;
        }
      } else {
        // 交易失败
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
              card-text="测试卡号信息如下：`4111111111111111`，`12/25`，`123``"
              card-title=""/>
    <div id='pacypay_checkout'></div>
  </div>
</template>

<style scoped>

</style>