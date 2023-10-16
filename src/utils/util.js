import request from "@/utils/request";

/**
 * Function to recursively get all keys from an object,
 * including nested keys in the format 'parent.child'
 *
 * @param {Object} obj - The object from which to get keys
 * @param {string} prefix - The prefix to be added before the key
 *
 * @returns {Array<string>} An array of keys
 */
export function getKeys(obj, prefix = 'formData') {
    let count = 0;
    return Object.entries(obj).reduce((keys, [key, value]) => {
        // Construct the full key with the prefix, if one exists
        const fullKey = `${prefix}.${key}`;
        count++;

        // Check if the current value is an object (and not null)
        if (typeof value === 'object' && value !== null) {
            // If value is an object, recursively get its keys
            const nestedKeys = getKeys(value, `${fullKey}`);

            // Add the nestedKeys to the list of keys
            return [...keys, ...nestedKeys];
        } else {
            // If value is not an object, just add the key to the list of keys
            return [...keys, fullKey];
        }
    }, []);
}

/**
 * Hashes the provided message using the SHA-256 algorithm.
 *
 * @param {string} message - The message to be hashed.
 * @param {string} [confusion] - An optional string used for additional confusion. If not provided, Abel's private key will be used as the default value.
 * @returns {Promise<string>} The hashed message as a hexadecimal string.
 */
export const hash = async (message, confusion) => {

    const byte2Hex = (bytes) => {
        let hexString = '';

        for (const value of bytes) {
            let hexValue = (value & 0xFF).toString(16);

            if (hexValue.length === 1) {
                hexValue = '0' + hexValue;
            }

            hexString += hexValue;
        }

        return hexString;
    };

    let encryptedMessage = null;
    const algorithm = 'SHA-256';

    // Default value is Abel's private key
    confusion = typeof confusion === 'string' && confusion.trim() !== ''
        ? confusion
        : '59c5b49a58c74340b28ecc68004e815a';

    try {
        // Convert the message and confusion to ArrayBuffer
        const encoder = new TextEncoder();
        const messageBuffer = encoder.encode(message + confusion);

        // Hash the concatenated buffer
        const hashBuffer = await crypto.subtle.digest(algorithm, messageBuffer);

        // Convert the hash to a hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        encryptedMessage = byte2Hex(hashArray);

    } catch (error) {
        console.error(`Error while hashing message: ${error.message}`);
    }

    return encryptedMessage;
};


/**
 * Concatenates values of an object into a single string.
 *
 * @param {Object} obj - The object whose values to concatenate.
 * @return {string} - The concatenated string of object values.
 */
export function concatObjectValues(obj) {
    let result = '';
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // If the value is an object, concatenate its values
            result += JSON.stringify(obj[key]);
        } else if (obj.hasOwnProperty(key) && obj[key] !== null) {
            // If the value is not an object, directly concatenate it
            result += obj[key];
        }
    }
    return result;
}


/**
 * Converts all object values to string using JSON.stringify.
 *
 * @param {Object} obj - The object to convert.
 * @param optionals - The optional fields to be filtered out.
 * @return {Object} - The object with values of required fields converted to string.
 */
export function objectValuesToString(obj, optionals = []) {
    // Iterating over properties of the object
    for (let key in obj) {

        // skip this key and move to next iteration
        if (optionals.includes(key)) {
            continue;
        }

        // Checking if the object has the property to avoid inherited properties
        if (obj.hasOwnProperty(key)) {
            // If the value of the property is an object, convert it to string using JSON.stringify
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                obj[key] = JSON.stringify(obj[key]);
            }
        }
    }
    return obj;
}

export const sortFields = (obj) => {
    let result = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
        result[key] = obj[key];
    }
    return result;
};


/**
 * Generates a sign for the given `requestBody`.
 *
 * @param {Object} requestBody - The request body object.
 * @returns {Promise<string>} A Promise that resolves with the generated sign.
 */
export const generateSign = async (requestBody) => {
    // 将requestBody字段升序排序
    const sortedRequestBody = sortFields(requestBody)

    // 每次提交前清空sign
    sortedRequestBody.sign = ''

    // 生成随机merchantTxnId
    requestBody.merchantTxnId = '' + Math.floor(Math.random() * 1000000000000)
    sortedRequestBody.merchantTxnId = requestBody.merchantTxnId

    // 拼接参数值
    const tmp = concatObjectValues(sortedRequestBody);

    // 获取签名
    return hash(tmp, '').then((sign) => {
        return sign;
    });
};


/**
 * Async function to make a payment.
 *
 * @param {string} uri - The URI to send the payment request to.
 * @param {object} requestBody - The payment request body.
 * @param filter 需要过滤的非必签名字段
 * @returns {Promise<void>} - A promise that resolves when the payment is made.
 */
export const makePayment = async (uri, requestBody, filter = []) => {
    // 生成签名
    requestBody.sign = await generateSign(requestBody, filter);

    // 生成签名后的请求体
    const req = objectValuesToString(requestBody);

    // 提交表单
    return request.post(uri, req);
};
