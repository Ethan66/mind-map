/**
 * 工具类
 */
import CryptoJS from 'crypto-js'

class AES {
  key: any
  iv: any

  constructor(iv = '16-Bytes--String') {
    this.iv = CryptoJS.enc.Utf8.parse(iv)
  }

  // 获取aes加密key
  private getKey(key: string) {
    const keyStr = key ? key.substring(0, 16) : '0123456789012345'
    return CryptoJS.enc.Utf8.parse(keyStr)
  }

  // 加密
  encrypt(key: string, word: string) {
    const keyStr = this.getKey(key)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, keyStr, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  }

  // 解密
  decrypt(key: string, word: string) {
    const keyStr = this.getKey(key)
    const decrypt = CryptoJS.AES.decrypt(word, keyStr, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}

export default new AES()
