<script setup>
import {onBeforeUnmount, onMounted} from "vue";
import PacypayCheckout from '@/js/pacypay';

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

function createCheckout(config, transactionId) {
  try {
    console.log(config.environment, 333)
    const merchantInfo = checkMerchant(config.environment);
    const containerElement = document.getElementById(container);
    this._initContainerHeight = containerElement.scrollHeight;

    const iframeElement = createIframe({
      src: merchantInfo.iframeUrl,
      title: 'pacypay iframe',
      policy: 'origin',
      styleStr: 'border: none; height:100%; width:100%; overflow:hidden;',
    });

    containerElement.innerHTML = '';
    containerElement.appendChild(iframeElement);

    window.removeEventListener('message', handleMessage, true);
    window.addEventListener('message', handleMessage, true);

    iframeElement.onload = () => {
      config = configureCheckout(config, transactionId);
      sendMessage('pacypay_theme', JSON.stringify(config));
    };
  } catch (error) {
    this.onError && this.onError(error);
  }
}

function checkMerchant(environment) {
  return {iframeUrl: getIframeUrl(environment)};
}

function submit(payload) {
  sendMessage('pacypay_checkout_submit', payload);
}

function onChangeWH(data) {
  const height = JSON.parse(data).height;
  const newHeight = Math.max(this._initContainerHeight, height);
  document.getElementById(this.container).style.height = `${newHeight}px`;
}

function getIframeUrl(environment) {
  const urls = {
    sandbox: 'https://sandbox-v3-checkout-sdk.pacypay.com',
    production: 'https://v3-checkout-sdk.pacypay.com',
  };
  return urls[environment.toLowerCase()] || urls.production;
}

function createIframe({src, title, policy, styleStr}) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', src);
  iframe.setAttribute('class', 'pacypay-iframe');

  if (!title || title.trim().length === 0 || title.trim().toLowerCase() === 'none') {
    iframe.setAttribute('role', 'presentation');
  } else {
    iframe.setAttribute('title', title);
  }

  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('style', styleStr);
  iframe.setAttribute('referrerpolicy', policy);
  iframe.setAttribute('scrolling', 'no');

  const fallbackText = document.createTextNode("<p>Your browser does not support iframes.</p>");
  iframe.appendChild(fallbackText);

  return iframe;
}

function configureCheckout(config, transactionId) {
  config.paymentMethod = config.subProductType || 'card';
  config.checkoutTheme = config.checkoutTheme || 'light';
  config.showPayButton = typeof config.showPayButton !== 'boolean' || !!config.showPayButton;
  config.buttonSeparation = typeof config.buttonSeparation !== 'boolean' || !!config.buttonSeparation;
  config.displayBillingInformation = typeof config.displayBillingInformation !== 'boolean' || !!config.displayBillingInformation;
  config.locale = config.locale || this.$locale; // Adjust as per your Vue setup
  config.transactionId = transactionId;
  config.originUrl = window.location.origin;
  return config;
}

function sendMessage(action, data) {
  a && a.contentWindow.postMessage({action, data}, '*');
}

function handleMessage(event) {
  const {action, data} = event.data || {};
  switch (action) {
    case 'pacypay_checkout_success':
      r && r.onPaymentCompleted && r.onPaymentCompleted(JSON.parse(data));
      break;
    case 'pacypay_checkout_error':
      r && r.onError && r.onError(data);
      break;
    case 'pacypay_checkout_wh':
      r && r.onChangeWH && r.onChangeWH(data);
      break;
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage, true);
})


function handleCheckOut() {
  const orderInfo = {
    "merchantNo": "800209",
    "merchantTxnId": "1654675447666",
    "merchantTxnTime": null,
    "merchantTxnTimeZone": null,
    "productType": "CARD",
    "subProductType": "DIRECT",
    "txnType": "SALE",
    "orderAmount": "22.1",
    "orderCurrency": "USD",
    "originTransactionId": null,
    "risk3dsStrategy": null,
    "txnOrderMsg": "{\"returnUrl\":\"https://www.ronhan.com/\",\"products\":\"[{\\\"name\\\":\\\"iphone 11\\\",\\\"price\\\":\\\"5300.00\\\",\\\"num\\\":\\\"2\\\",\\\"currency\\\":\\\"CNY\\\"},{\\\"name\\\":\\\"macBook\\\",\\\"price\\\":\\\"1234.00\\\",\\\"num\\\":\\\"1\\\",\\\"currency\\\":\\\"USD\\\"}]\",\"transactionIp\":\"127.0.0.1\",\"appId\":1700077023031386112,\"javaEnabled\":false,\"colorDepth\":\"24\",\"screenHeight\":\"1080\",\"screenWidth\":\"1920\",\"timeZoneOffset\":\"-480\",\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"userAgent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"contentLength\":\"340\",\"language\":null}",
    "shippingInformation": "{\"firstName\":\"Shipping\",\"lastName\":\"Name\",\"phone\":\"188888888888\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"888888\",\"address\":\"Shipping Address Test\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"WH\",\"street\":\"833 Cheung Sha Wan Road\",\"number\":\"1\",\"identityNumber\":\"82962612865\"}",
    "billingInformation": "{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"18600000000\",\"email\":\"taoyun15@gmail.com\",\"postalCode\":\"430000\",\"address\":\"Unit 1113, 11/F, Tower 2, Cheung Sha Wan Plaza, 833 Cheung Sha Wan Road, Lai Chi Kok\",\"country\":\"CN\",\"province\":\"HB\",\"city\":\"HK\"}",
    "sign": "56c366036987f717c90fad2dc41cebea1c9872dc86d86ea919afb6e765f76d6c"
  }

  fetch('https://sandbox-v3-acquiring.pacypay.com/v1/sdkTxn/doTransaction', {
    method: 'POST'
  })
      .then(res => {
        console.log(res);
        return res.json();
      }).catch(err => {
    console.log("发生错误", err);
  })
}

const transactionId = '1701511690996621312'; //当前交易ID

const pacypay = new PacypayCheckout(transactionId, {
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
});
</script>

<template>
  <div id='pacypay_checkout'></div>
</template>

<style scoped>

</style>