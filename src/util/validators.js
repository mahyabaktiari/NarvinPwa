import axios from "axios";
import { Routes } from "../api/api";

export const checkdigit = (billId, payId, billType, billAmount) => {
  let wch_bil = ["", "آب", "برق", "گاز", "تلفن‌ثابت", "تلفن‌ همراه", "شهرداری"];

  //---------------------------------
  // Bill Id calculation
  // Get Bill_Id value from input
  // Calculate Bill_Id length
  billId = Number(billId).toString();
  payId = Number(payId).toString();
  let bil_rightPart = billId.substr(billId.length - 5, 5);
  let companyCode = bil_rightPart.substr(0, 3);
  let bil_len = billId.length - 1;
  // Define an array for getting each digit of Bill_Id
  let bil_arr = [];
  // Fill arrray and Calculate summary of it
  let i = 0;
  let bil_sum = 0;
  for (let b = bil_len; b >= 0; b--) {
    i++;
    i = i > 7 ? 2 : i;
    bil_arr[b] = billId.substr(b, 1) * i;
    if (i > 1) bil_sum += bil_arr[b];
  }
  let serviceCode = billId.substr(bil_len - 1, 1);
  let noe = wch_bil[billId.substr(bil_len - 1, 1)];

  // Calculate remainder of bil_sum divided by 11
  let bil_mod = bil_sum % 11;
  // Calculate control number of Bill_Id
  let bil_ctrl = bil_mod == 0 || bil_mod == 1 ? 0 : 11 - bil_mod;
  // Show the result
  let billVerify =
    bil_arr[bil_len] == bil_ctrl
      ? console.log("bill true")
      : console.log("bill false");

  //---------------------------------
  // Pay Id calculation
  // Get Pay_Id value from input
  // Calculate Pay_Id length
  let pay_len = payId.length - 1;
  // Define an array for getting each digit of Pay_Id
  var pay_arr = [];
  // Fill arrray and Calculate summary of it
  i = -1;
  let pay_sum = 0;
  let r = "";
  for (let p = pay_len; p >= 0; p--) {
    i++;
    i = i > 7 ? 2 : i;
    pay_arr[p] = payId.substr(p, 1) * i;
    if (i > 1) pay_sum += pay_arr[p];
    if (p < pay_len - 4) r = payId.substr(p, 1) + r;
  }
  // Calculate remainder of pay_sum divided by 11
  let pay_mod = pay_sum % 11;
  // Calculate first control number of Pay_Id
  let pay_ctrl = pay_mod == 0 || pay_mod == 1 ? 0 : 11 - pay_mod;
  let payVerify =
    pay_arr[pay_len - 1] == pay_ctrl
      ? console.log("pay true")
      : console.log("pay false");

  //---------------------------------
  // Mix id calculation
  // Get Mix_Id value from integration of available values
  let nPay_val = Number(payId).toString();
  let mix_val = billId + nPay_val.substr(0, nPay_val.length - 1);
  // Calculate Mix_Id length
  let mix_len = mix_val.length - 1;
  // Define an array for getting each digit of Mix_Id
  let mix_arr = [];
  // Fill arrray and Calculate summary of it
  i = 1;
  let mix_sum = 0;
  for (let m = mix_len; m >= 0; m--) {
    i++;
    i = i > 7 ? 2 : i;
    mix_arr[m] = mix_val.substr(m, 1) * i;
    mix_sum += mix_arr[m];
  }
  // Calculate remainder of mix_sum divided by 11
  let mix_mod = mix_sum % 11;
  // Calculate second control number of Pay_Id
  let mix_ctrl = mix_mod == 0 || mix_mod == 1 ? 0 : 11 - mix_mod;
  let mixVerify = payId[pay_len] == mix_ctrl ? true : false;
  billType = noe;
  billAmount = Number(r * 1000).toString();
  // Show the result
  return [
    mixVerify,
    billType,
    billAmount,
    serviceCode,
    companyCode,
    fil_zro(payId),
    fil_zro(billId),
  ];
};

export function fil_zro(val, len) {
  let zro = "";
  for (let v = val.length; v < 13; v++) {
    zro += "0";
  }
  return zro + val;
}

export const checkdigitOnlyBill = (billId) => {
  billId = Number(billId).toString();
  let bil_len = billId.length - 1;
  // Define an array for getting each digit of Bill_Id
  let bil_arr = [];
  // Fill arrray and Calculate summary of it
  let i = 0;
  let bil_sum = 0;
  for (let b = bil_len; b >= 0; b--) {
    i++;
    i = i > 7 ? 2 : i;
    bil_arr[b] = billId.substr(b, 1) * i;
    if (i > 1) bil_sum += bil_arr[b];
  }

  // Calculate remainder of bil_sum divided by 11
  let bil_mod = bil_sum % 11;
  // Calculate control number of Bill_Id
  let bil_ctrl = bil_mod == 0 || bil_mod == 1 ? 0 : 11 - bil_mod;
  // Show the result
  let billVerify = bil_arr[bil_len] == bil_ctrl;
  return billVerify;
};

// rial
export const ToRial = (str) => {
  str = str.replace(/\,/g, "");
  var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
  while (objRegex.test(str)) {
    str = str.replace(objRegex, "$1,$2");
  }
  return str;
};
//async rial
export function moneySplitter(input) {
  if (input == 0 || input == null) {
    return 0;
  } else {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export const getWalletBalance = (token) => {
  return axios
    .get(`${Routes.walletBalance}`, { headers: { token: token } })
    .then((res) => {
      return res.data.value.response; // return your amount direct
    })
    .catch((err) => {
      return 0; // return your amount direct
      console.log(err.response);
    });
};
export const getWalletBalanceAsync = async (token) => {
  try {
    const res = await axios.get(`${Routes.walletBalance}`, {
      headers: { token: token },
    });
    console.log("wallet", res);
    return moneySplitter(res.data.value.response); // return your amount direct
  } catch (err) {
    console.log(err.response);
    return 0; // return your amount direct
  }
};

export const addMerchant = (
  token,
  BasePrice,
  StoreName,
  StoreLogo,
  ActivityType,
  PhoneNumber,
  MobileNumber,
  PostalCode,
  Address,
  Email,
  IbanNumber,
  GuildCode,
  BusinessCertificateNumber,
  CertificateExpiryDate,
  CityId,
  MerchantTypeId,
  currentLocation,
  AddressSite
) => {
  let dataSubmited = true;
  console.log(BusinessCertificateNumber);
  console.log(GuildCode);
  axios
    .post(
      `${Routes.addMerchant}`,
      {
        basePrice: BasePrice === "" ? 0 : Number(BasePrice.replace(/,/g, "")),
        StoreName: StoreName,
        StoreLogo: StoreLogo,
        ActivityType: ActivityType,
        PhoneNumber: PhoneNumber,
        FaxNumber: "",
        Mobile: MobileNumber,
        PostalCode: PostalCode,
        Address: Address,
        Email: Email,
        Website: AddressSite,
        BusinessCertificateNumber: BusinessCertificateNumber,
        GuildCode: GuildCode,
        CertificateExpiryDate: CertificateExpiryDate,
        IbanNumber:
          IbanNumber === "" || IbanNumber === "null" || IbanNumber == null
            ? null
            : IbanNumber !== "" || IbanNumber != null || IbanNumber !== "null"
            ? "IR" + IbanNumber
            : null,
        CityId: CityId,
        MerchantTypeId: MerchantTypeId == "" ? "2" : MerchantTypeId,
        lat: currentLocation.lat != 0 ? currentLocation.lat : 35.700978,
        long: currentLocation.long != 0 ? currentLocation.long : 51.337462,
      },
      { headers: { token: token } }
    )
    .then((res) => {
      console.log(res);
      if (res.data.value.response === true) {
        return (dataSubmited = true);
      }
    })
    .catch((err) => {
      console.log(err.response);
      alert("در ثبت اطلاعات مشکلی پیش آمده!");
      return (dataSubmited = false);
    });
  return dataSubmited;
};
export const QrPayment = (id, token, amount) => {
  axios
    .post(
      "",
      {
        id: id, //reciever code
        amount: amount,
      },
      { headers: { token: token } }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat(bytes / k.toFixed(dm));
}

export function fillZeroMerchId(val, len) {
  let zro = "";
  for (let v = val.length; v < 8; v++) {
    zro += "0";
  }
  return zro + val;
}

export function isValidNationalCode(code) {
  if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

  var sum = 0,
    chars = code.split("");

  for (var i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

  var lastDigit,
    remainder = sum % 11;

  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
}

export const billIdenifier = (billid) => {
  let id = billid.toString();
  let billType = id.substr(id.length - 2, 1);

  if (billType == 0) {
    return "قبوض عمومی";
  }
  if (billType == 1) {
    return "آب";
  }
  if (billType == 2) {
    return "برق";
  }
  if (billType == 3) {
    return "گاز";
  }
  if (billType == 4) {
    return "مخابرات";
  }
  if (billType == 5) {
    return "تلفن همراه";
  }
  if (billType == 6 || billType == 7) {
    return "شهرداری";
  }
  if (billType == 8) {
    return "مالیات";
  }
  if (billType == 9) {
    return "عوارض و جرائم";
  }
};

export function splitInfo(barcode) {
  var str = barcode;
  var splited = str.split("|");
  let isNarvin = splited[0].split("/");
  var validBarcode =
    isNarvin.includes("narvin.ir") || isNarvin.includes("narvinpay.ir"); //narvinpay
  if (validBarcode) {
    var merchId = splited[0].split("/Mer/").pop().trim();
    //if we have extra info such as price in barcode
    if (splited.length > 1) {
      var total = splited[1].split("=").pop().trim();
    }
    console.log([validBarcode, merchId, total]);
    return [validBarcode, merchId, total];
  } else {
    //we didn't have extra info so return the merchant Id only
    return [validBarcode];
  }
}
export const daysGen = () => {
  let arr = Array.from(new Array(32), (x, i) => i);
  arr.shift();

  return arr;
};
