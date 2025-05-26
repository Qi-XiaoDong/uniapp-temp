import CryptoJS from "crypto-js";

export default class HasCrypto {
    private secretKey = "d485f180b50293a99f00c8e7cda3b0d0"; //  AES-128
    // 加密
    encrypt(text:string) {
        const key = CryptoJS.enc.Utf8.parse(this.secretKey);
        const iv = CryptoJS.enc.Utf8.parse(this.secretKey); // 通常IV是随机生成的，这里为了示例使用了密钥
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    // 解密
    decrypt(encryptedText:string) {
        const key = CryptoJS.enc.Utf8.parse(this.secretKey);
        const iv = CryptoJS.enc.Utf8.parse(this.secretKey); // 与加密时使用相同的IV
        const decryptedText = CryptoJS.AES.decrypt(encryptedText, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decryptedText.toString(CryptoJS.enc.Utf8);
    }
}