class PacypayCheckout {
    constructor(config, instanceConfig = {}) {
        if (!config) {
            throw new Error("Pacypay -> transactionId is null!");
        }

        this.container = instanceConfig.container || 'pacypay_checkout';
        this.onPaymentCompleted = instanceConfig.onPaymentCompleted;
        this.onError = instanceConfig.onError;
        this._initContainerHeight = 0;

        this.createCheckout(instanceConfig, config);
    }

    static version = '1.0.5';

    static createIframe(options) {
        const { src, title = 'pacypay iframe', policy = 'origin', styleStr = 'border: none; height:100%; width:100%; overflow:hidden;' } = options;
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('class', 'pacypay-iframe');
        title === '' || title.trim().length === 0 || title.toLowerCase() === 'none' ? iframe.setAttribute('role', 'presentation') : iframe.setAttribute('title', title);
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('style', styleStr);
        iframe.setAttribute('referrerpolicy', policy);
        iframe.setAttribute('scrolling', 'no');
        const fallbackContent = document.createTextNode("<p>Your browser does not support iframes.</p>");
        iframe.appendChild(fallbackContent);
        return iframe;
    }

    createCheckout(config, transactionId) {
        try {
            const merchant = this.checkMerchant(config.environment);
            const container = document.getElementById(this.container);
            this._initContainerHeight = container.scrollHeight;

            const iframe = PacypayCheckout.createIframe({
                src: merchant.iframeUrl,
            });

            container.innerHTML = '';
            container.appendChild(iframe);

            window.removeEventListener('message', this.handleMessage, true);
            window.addEventListener('message', this.handleMessage.bind(this), true);

            iframe.onload = () => {
                config.config = config.config || {};
                config.config.transactionId = transactionId;
                config.config.originUrl = window.location.origin;

                config.config.paymentMethod = config.config.subProductType ? config.config.subProductType : 'card';

                ['checkoutTheme', 'showPayButton', 'buttonSeparation', 'displayBillingInformation'].forEach((prop) => {
                    config.config[prop] = typeof config.config[prop] === 'boolean' ? config.config[prop] : true;
                });

                config.config.locale = config.locale;

                this.postMessage('pacypay_theme', JSON.stringify(config.config));
            };
        } catch (error) {
            if (this.onError) {
                this.onError(error);
            }
        }
    }

    checkMerchant(environment) {
        return {
            iframeUrl: this.getIframeUrl(environment),
        };
    }

    getIframeUrl(environment) {
        const urls = {
            sandbox: 'https://sandbox-v3-checkout-sdk.pacypay.com',
            production: 'https://v3-checkout-sdk.pacypay.com',
        };
        return urls[environment.toLowerCase()] || urls.production;
    }

    static postMessage(action, data) {
        if (a && a.contentWindow) {
            a.contentWindow.postMessage({ action, data }, '*');
        }
    }

    handleMessage(event) {
        const data = event.data || {};
        const action = data.action;
        const payload = data.data;

        switch (action) {
            case 'pacypay_checkout_success':
                if (this.onPaymentCompleted) {
                    this.onPaymentCompleted(JSON.parse(payload));
                }
                break;
            case 'pacypay_checkout_error':
                if (this.onError) {
                    this.onError(payload);
                }
                break;
            case 'pacypay_checkout_wh':
                if (this.onChangeWH) {
                    this.onChangeWH(payload);
                }
                break;
        }
    }
}

export default PacypayCheckout;
