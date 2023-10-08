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