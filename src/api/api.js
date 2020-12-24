//  const Api = 'http://5.201.187.130:8082/api'; //وقتی لوکال بیلد میگیرین
// const Api = "http://5.201.187.130:8082/api"; //وقتی لوکال بیلد میگیرین
// const Api = "http://192.168.1.111:5000/api"; //لوکال دستگاه
// const Api = "http://192.168.1.105:5000/api"; // داخلی یونس
// const Api = "http://10.0.2.2:5000/api"; //لوکال دستگاه
// const Api = "http://192.168.43.14:5000/api"; //لوکال دستگاه
const Api = "http://185.55.226.121:5000/api"; //only for release builds server Pars
// const Api = "https://185.55.226.121:5050/api"; //only for release builds server Pars

const Routes = {
  //Register and login
  getAccountData: Api + "/Account",
  RegisterNewUser: Api + "/Account",
  ConfrimCode: Api + "/AccountDevice",
  updatePushNotif: Api + "/AccountDevice",
  getToken: Api + "/Account/",
  //Wallet Related
  walletCharge: Api + "/Transactions/",
  // Ipg: 'http://185.55.226.121:5004',
  Ipg: "http://185.55.226.121:5001",
  IpgPasargad: "http://payment.narvinpay.ir", //سرور اصلی
  walletBalance: Api + "/wallet/",
  IpgShaparak: "https://pep.shaparak.ir/gateway.aspx",
  //Bill Related
  BillCompanyCheck: Api + "/BillCompany/",
  BillPayment: Api + "/BillPayment/",
  BillInquery: Api + "/BillInquiry",
  AddBill: Api + "/BillInquiry/AddBill",
  MCIInquiry: Api + "/BillInquiry/Mci",
  RemoveBill: Api + "/BillInquiry/RemoveBill",
  PayInquiy: Api + "/BillPayment/PayInquiry",
  //Profile related
  ProfileEdit: Api + "/Profile",
  GetProvinces: Api + "/Province",
  GetCity: Api + "/City", //id of the province at the end
  //Transactions
  getAllTrans: Api + "/Wallet/All",
  getPayTrans: Api + "/Wallet/Withdrawal",
  getRecieveTrans: Api + "/Wallet/Deposit",
  getDetailTrans: Api + "/Wallet/Transactions", //id of tran at the end
  //Merchant Related
  GetTopStores: Api + "/Merchant/GetTopStores",
  getMerchantId: Api + "/Merchant", //needs typeId at the end of url
  addMerchant: Api + "/Merchant", //post method
  updateMerchant: Api + "/Merchant", //put method
  GetMerchantList: Api + "/Merchant/GetList", //id at the end of url
  DeleteMerchant: Api + "/Merchant/Remove",
  getMerchantInfo: Api + "/Merchant/GetList/MerInfo", // id at the end
  QrPayment: Api + "/order",
  getRefunds: Api + "/order", //for refund to merchant - get method
  settelRefund: Api + "/Settlement",
  GetMerchantType: Api + "/Merchant/GetMerchantType", //myqr, store,taxi etc...
  //product related
  getProductGroups: Api + "/ProductGroup",
  getAllProductsofGroup: Api + "/Product", //id of the group at the end
  getProdById: Api + "/Product/GetById", // id of product at the end
  purchaseProduct: Api + "/Purchase",
  Discount: Api + "/Discount",
  //charge related
  getChargeProducts: Api + "/Charge",
  getTopUp: Api + "/Charge/GetTopUpCharge",
  buyCharge: Api + "/Charge",
  deleteFave: Api + "/Charge/Favorites",
  getFave: Api + "/Charge/Favorites",
  //Buy Net Related
  GetNetType: Api + "/Charge/GetSimCardType", //sim id at the end
  GetPackages: Api + "/Charge/GetPackage", //sim operatorId/netTypeId/netGroupId
  //Messages screen related
  GetMessages: Api + "/Message/MessageSend",
  IRecivedMessages: Api + "/Message/MessageReceive", //confirmation of recieving of msgs
  //points related
  GetPoints: Api + "/Score",
  GetPointDetail: Api + "/Score/Deposit",
  GetPointSource: Api + "/Score/GetScoreSource",
  //reports related
  GenerateOrderReport: Api + "/Order/OrderReport", //sales order report
  GetReagent: Api + "/Account/GetReagentCount",
  GetCities: Api + "/Cities/GetCity",
  GetServisList: Api + "/Payaneh/GetServiceList",
  SeatRequest: Api + "/Payaneh/SeatRequest",
  SeatReserve: Api + "/Ticket/SeatReserve",
  SaleVerify: Api + "/Ticket/SaleVerify",
  SaleRefund: Api + "/Ticket/SaleRefund",
  Ticket: Api + "/Ticket",
  CanselTicket: Api + "/Ticket/SaleCancle",
  GetCharity: Api + "/Charity/GetCharity",
  Charity: Api + "/Charity",
};

export { Routes };
