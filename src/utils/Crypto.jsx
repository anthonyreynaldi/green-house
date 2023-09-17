import CryptoJS from 'crypto-js';

// credentials
const key = "NNPN0JBw83m?fH-W6hID.hUh)-FW,W6-FkinBqx(B'S~-Oh*l`bp(MalWa`T.UZ";

export const encrypt = (plainText) => {
    return CryptoJS.AES.encrypt(plainText, key).toString();
}

export const decrypt = (chiperText) => {
    const decryptedBytes = CryptoJS.AES.decrypt(chiperText, key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedData;
}