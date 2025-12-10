import CryptoJS from "crypto-js";

const locen_key = process.env.NEXT_PUBLIC_LOCENCKEY;
const iv_key = process.env.NEXT_PUBLIC_IVKEY;


export function encrypt(text) {
  return CryptoJS.AES.encrypt(JSON.stringify(text), locen_key).toString();
}

export function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, locen_key);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return data;
  }
}

// Function for secure AES encryption with IV
export const encryptSecureData = (text) => {
  try {
    const key = CryptoJS.enc.Utf8.parse(locen_key);
    const iv = CryptoJS.enc.Utf8.parse(iv_key);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  } catch (error) {
    return text;
  }
};

// Function for secure AES decryption with IV
export const decryptSecureData = (encryptedText) => {
  try {
    const key = CryptoJS.enc.Utf8.parse(locen_key);
    const iv = CryptoJS.enc.Utf8.parse(iv_key);

    const decrypted = CryptoJS.AES.decrypt(encryptedText || "", key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText ? decryptedText : encryptedText || "";
  } catch (e) {
    return encryptedText;
  }
};

export function encryptRequest(obj) {
  let data = CryptoJS.AES.encrypt(
    JSON.stringify(obj),
    import.meta.env.VITE_LOCENCKEY
  ).toString();
  return { key: "web", data: data };
}

export function decryptResponse(data) {
  if (data.data !== null) {
    const bytes = CryptoJS.AES.decrypt(
      data.data,
      import.meta.env.VITE_LOCENCKEY
    );
    try {
      let dataObj = {
        data: JSON.parse(bytes.toString(CryptoJS.enc.Utf8)),
        message: data.message,
      };

      return dataObj;
    } catch (error) {
      return data;
    }
  } else {
    return data;
  }
}
