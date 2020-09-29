import React, { useEffect, useState } from "react";
import styles from "./styles";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Store from "../../components/Store/Store";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Modal from "react-modal";
import TextField from "@material-ui/core/TextField";
import SubminBtn from "../../components/SubmitButton/SubmitButton";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Routes } from "../../api/api";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import DateTime from "../../components/DatePicker/DatePicker";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import Snackbar from "@material-ui/core/Snackbar";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";

const MyStore = (props) => {
  const customStyles = {
    content: {
      width: "100%",
      height: "100vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
      zIndex: 10000,
      border: "none",
    },
  };
  const modalStyles = {
    content: {
      width: "100%",
      height: "80vh",
      overflow: "hidden",
      bottom: 0,
      right: 0,
      left: 0,
      top: "auto",
      padding: 0,
      zIndex: 10000,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  };

  const merchantModal = {
    content: {
      width: "100%",
      paddingBottom: 30,
      overflow: "hidden",
      bottom: 0,
      right: 0,
      left: 0,
      top: "auto",
      padding: 0,
      zIndex: 10000,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  };

  const CssTextField = makeStyles((theme) => ({
    root: {
      marginTop: 15,
      width: "70%",
      "& label.Mui-focused": {
        color: "#CD0448",
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: 11,
        top: -5,
      },
      "& label.MuiFormLabel-filled ": {
        textAlign: "right",
        fontFamily: "IRANSansMobile",
        fontSize: 11,
        top: -5,
      },
      "& .MuiInputLabel-formControl": {
        transform: "none",
        top: 20,
        right: 12,
        fontSize: 14,
        fontFamily: "IRANSansMobile",
        zIndex: 0,
      },
      "& .MuiFormControl-root": {
        direction: "ltr",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#CD0448",
      },
      "& .MuiInputBase-input": {
        fontFamily: "IRANSansMobile",
        height: 15,
        fontSize: 14,
        zIndex: -1,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "gray",
          zIndex: 0,
          "& legend": {
            textAlign: "right",
          },
        },
        "&:hover fieldset": {
          borderColor: "#CD0448",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#CD0448",
        },
      },
      "& .MuiSelect-iconOutlined": {
        left: 0,
        right: "90%",
      },
      "& .MuiSelect-outlined.MuiSelect-outlined": {
        paddingRight: 14,
      },
    },
  }));
  const classes = styles();
  const classInput = CssTextField();
  const [Loading, setLoading] = useState(false);
  const [storeLogo, setStoreLoge] = useState("");
  const [imgUri, setImageUri] = useState("");
  const [token, setToken] = useState("");
  const [AllStores, setAllstores] = useState([]);
  const [merchantId, setMerchantId] = useState("");
  const [merchantType, setMerchantType] = useState();
  const [merchanTypes, setmerchantTypes] = useState([]);
  const [merchantTypeId, setMerchantTypeId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [storePhoneNumber, setStorPhonNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [email, setEmail] = useState("");
  const [ActivityType, setActivityType] = useState("");
  const [IbanNumber, setIbanNumber] = useState("");
  const [AddressSite, setAddressSite] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [BusinessCertificateNumber, setBusinessCertificateNumber] = useState(
    null
  );
  const [GuildCode, setGuildCode] = useState("");
  const [CertificateExpiryDate, setCertificateExpiryDate] = useState("");
  const [isStoreActive, setIsStoreActive] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectMerchant, setSelectMerchant] = useState(false);
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectProvince, setSelectProvince] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const { date } = useDateState();
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  console.log(AllStores);

  useEffect(() => {
    let tokenStorege = localStorage.getItem("token");
    setToken(tokenStorege);
    console.log(tokenStorege);
    getAllMerchants(tokenStorege);
    getMerchantTypes(tokenStorege);
    getProvinces(tokenStorege);
  }, []);

  const getAllMerchants = (tokenStorege) => {
    //2 = get the list of user stores
    axios
      .get(`${Routes.GetMerchantList}`, { headers: { token: tokenStorege } })
      .then((res) => {
        console.log(res);
        setAllstores(res.data.value.response);
      })
      .catch((err) => {
        setTextSnack("بازیابی فروشگاه ها با خطا مواجه شد!");
        setSnackBar(true);
        return console.log(err.response);
      });
  };

  const getMerchantTypes = async (token) => {
    setSuccess(false);
    try {
      const { data } = await axios.get(`${Routes.GetMerchantType}`, {
        headers: { token: token },
      });
      console.log("====================================");
      console.log("this is merch types", data);
      console.log("====================================");
      if (data.responseCode === 200) {
        var merTypes = data.value.response;
        setmerchantTypes(merTypes);
      } else {
        setTextSnack(data.message);
        setSnackBar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const selectImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const readerr = new FileReader();
      readerr.addEventListener("load", () => setImageUri(readerr.result));
      readerr.readAsDataURL(e.target.files[0]);
    } else {
      setImageUri(imgUri);
    }
  };
  const [open, setOpen] = useState(false);
  const getProvinces = async (token) => {
    try {
      const { data } = await axios.get(`${Routes.GetProvinces}`, {
        headers: { token: token },
      });
      if (data.responseCode === 200) {
        setProvinces(data.value.response);
        setSearchProvince(data.value.response);
        axios
          .get(`${Routes.GetCity}/${"-1"}`, { headers: { token: token } })
          .then(({ data }) => {
            if (data.responseCode === 200) {
              console.log(data);
              setCities(data.value.response);
              setSearchCity(data.value.response);
            } else {
              setTextSnack(data.message);
              setSnackBar(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setCities([]);
          });
      } else {
        setTextSnack(data.message);
        setSnackBar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = (id) => {
    console.log(provinceId);
    axios
      .get(`${Routes.GetCity}/${id}`, { headers: { token: token } })
      .then(({ data }) => {
        console.log(data);
        if (data.responseCode === 200) {
          setCities(data.value.response);
          setSearchCity(data.value.response);
          console.log(cityId);
        } else if (data.responseCode === 404) {
          return;
        } else {
          setTextSnack(data.message);
          setSnackBar(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const SearchFilterFunction = (e) => {
    let text = e.target.value.toLowerCase();
    let filteredName = searchProvince.filter((item) => {
      return item.provinceName.toLowerCase().match(text);
    });
    console.log(filteredName);
    setProvinces(filteredName);
  };

  const searchFilterCity = (e) => {
    let text = e.target.value.toLowerCase();
    let filter = searchCity.filter((item) => {
      return item.cityName.toLowerCase().match(text);
    });
    setCities(filter);
  };
  const reset = () => {
    setStoreName("");
    setImageUri("");
    setStorPhonNumber("");
    setMobileNumber("");
    setMerchantTypeId("");
    setAddressSite("");
    setStoreAddress("");
    setIbanNumber("");
    setBasePrice("");
    setCityId("");
    setProvinceId("");
    setGuildCode("");
    setEmail("");
    setActivityType("");
    setCurrentLocation("");
    setBusinessCertificateNumber("");
    setPostalCode("");
  };
  const hendleSubmit = () => {
    let isDataSubmited = false;
    if (
      storeName === "" ||
      storeAddress === "" ||
      storePhoneNumber == null ||
      mobileNumber === ""
    ) {
      setTextSnack("نام و آدرس و شماره تماس الزامی ست .");
      setSnackBar(true);
    } else if (merchantTypeId == 0) {
      setTextSnack("لطفا نام پذیرنده را انتخاب کنید.");
      setSnackBar(true);
    } else if (IbanNumber != "" && IbanNumber.length < 24) {
      setTextSnack("شماره شبا نامعتبر !");
      setSnackBar(true);
    } else if (cityId == "") {
      setTextSnack("لطفا نام شهر را انتاخب کنید.");
      setSnackBar(true);
    } else {
      isDataSubmited = addMerchant(
        token,
        basePrice,
        storeName,
        imgUri,
        ActivityType,
        storePhoneNumber,
        mobileNumber,
        postalCode,
        storeAddress,
        email,
        IbanNumber,
        GuildCode,
        BusinessCertificateNumber,
        date,
        cityId,
        merchantTypeId,
        currentLocation,
        AddressSite
      );
      if (isDataSubmited === true) {
        console.log("ok");
        setSuccess(true);
        setTextSnack("فروشگاه با موفقیت ثبت شد.");
        setSnackBar(true);

        setTimeout(() => {
          setOpen(false);
          reset();
          getAllMerchants(token);
        }, 2000);
        // this.setState({ addModalVisible: false });
        // this.setState({ Loading: false });
        // this.setState({ coordsSubmitted: false });
        // console.log("state all stores", AllStores);
        //  return this.resetState();
      } else {
        alert("خطا در ثبت اطلاعات!");
      }
    }
  };
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header
          text="فروشگاه من"
          click={() => props.history.push("/profile")}
        />
        <div className={classes.addStore} onClick={() => setOpen(true)}>
          <AddRoundedIcon />
          <p style={{ margin: 0, marginTop: 5, paddingLeft: 10 }}>
            {" "}
            افزودن فروشگاه
          </p>
        </div>
        <div>
          {AllStores.map((storeInfo) => {
            return (
              <Store
                storeInfo={storeInfo}
                token={token}
                getAllMerchants={() => getAllMerchants(token)}
              />
            );
          })}
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={classes.myoverlay}
        >
          <div className={classes.modalContainer}>
            <Header text="افزودن فروشگاه" click={() => setOpen(false)} />
            <button className={classes.btn}>
              <label
                for="EjareName"
                class="btn btn-primary btn-block btn-outlined"
              >
                <img
                  src={
                    imgUri ? imgUri : require("../../assets/icons/profile.png")
                  }
                  className={classes.img}
                />
              </label>
              <input
                type="file"
                id="EjareName"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  selectImg(e);
                  // this.setState({ EjareNamedisCrp: true });
                }}
              />
            </button>
            <TextField
              className={classInput.root}
              id="custom-css-standard-input"
              label="نام فروشگاه(الزامی)"
              variant="outlined"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <TextField
              className={classInput.root}
              classes={{ root: classInput.root }}
              label="نوع پذیرنده"
              select
              variant="outlined"
              value={merchantTypeId}
              onClick={() => {
                setSelectMerchant(true);
              }}
            >
              {merchanTypes.map((merchant) => (
                <MenuItem key={merchant.id} value={merchant.id}>
                  {merchant.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classInput.root}
              id="custom-css-standard-input"
              label="نوع فعالیت"
              variant="outlined"
              value={ActivityType}
              onChange={(e) => setActivityType(e.target.value)}
            />
            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="مبلغ پیشفرض تراکنش(ریال)"
              variant="outlined"
              value={ToRial(basePrice)}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="شماره تلفن فروشگاه(الزامی)"
              variant="outlined"
              value={storePhoneNumber}
              onChange={(e) => setStorPhonNumber(e.target.value)}
              inputProps={{
                maxLength: 11,
              }}
            />

            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="شماره موبایل(الزامی)"
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              inputProps={{
                maxLength: 11,
              }}
            />

            <TextField
              className={classInput.root}
              classes={{ root: classInput.root }}
              label="استان(الزامی)"
              select
              variant="outlined"
              value={provinceId}
              onClick={() => {
                setShowModal(true);
                setSelectProvince(true);
              }}
            >
              {provinces.map((option) => (
                <MenuItem key={option.provinceId} value={option.provinceId}>
                  {option.provinceName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classInput.root}
              select
              label="شهر(الزامی)"
              variant="outlined"
              value={cityId}
              onClick={() => setShowModal(true)}
            >
              {cities.map((option) => (
                <MenuItem key={option.cityId} value={option.cityId}>
                  {option.cityName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classInput.root}
              id="custom-css-standard-input"
              label="آدرس فروشگاه(الزامی)"
              variant="outlined"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <TextField
              type="number"
              className={classInput.root}
              id="custom-css-standard-input"
              label="موقعیت فروشگاه"
              variant="outlined"
            />
            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="کد پستی"
              variant="outlined"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              inputProps={{
                maxLength: 10,
              }}
            />
            <div
              style={{
                width: "100%",
                marginRight: "30%",
                position: "relative",
              }}
            >
              <TextField
                type="tel"
                className={classInput.root}
                id="custom-css-standard-input"
                label="شماره شبا"
                variant="outlined"
                value={IbanNumber}
                onChange={(e) => setIbanNumber(e.target.value)}
                inputProps={{
                  maxLength: 24,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  color: "lightgray",
                  top: "50%",
                  left: "33%",
                  fontSize: "1rem",
                }}
              >
                IR
              </span>
            </div>
            <TextField
              className={classInput.root}
              id="custom-css-standard-input"
              label="ایمیل"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className={classInput.root}
              id="custom-css-standard-input"
              label="آدرس سایت فروشگاه"
              variant="outlined"
              value={AddressSite}
              onChange={(e) => setAddressSite(e.target.value)}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="شماره جواز کسب و کار"
              variant="outlined"
              value={BusinessCertificateNumber}
              onChange={(e) => setBusinessCertificateNumber(e.target.value)}
              inputProps={{
                maxLength: 10,
              }}
            />
            <TextField
              type="tel"
              className={classInput.root}
              id="custom-css-standard-input"
              label="شماره صنفی"
              variant="outlined"
              value={GuildCode}
              onChange={(e) => setGuildCode(e.target.value)}
              inputProps={{
                maxLength: 10,
              }}
            />
            <DateTime text="تاریخ انقضای جواز کسب" selectedDate={""} />
            <SubminBtn
              text="ثبت اطلاعات"
              disable={
                !storeName ||
                !storePhoneNumber ||
                !mobileNumber ||
                !provinceId ||
                !cityId ||
                cityId.includes("-1")
              }
              click={hendleSubmit}
            />
          </div>
        </Modal>
        <Modal
          isOpen={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
          style={modalStyles}
          overlayClassName={classes.myoverlay}
          contentLabel="Example Modal"
        >
          <div className={classes.containerModal}>
            <KeyboardArrowDownRoundedIcon
              style={{ width: "15%", height: 35 }}
              onClick={() => {
                setShowModal(false);
                setSelectProvince(false);
              }}
            />
            {selectProvince ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <TextField
                  className={classInput.root}
                  id="custom-css-standard-input"
                  label="نام استان مورد نظر "
                  variant="outlined"
                  onChange={(text) => SearchFilterFunction(text)}
                />
                {provinces.map((item) => {
                  return (
                    <div
                      style={{
                        borderBottom: "0.5px solid #c1c1c1",
                        width: "70%",
                        textAlign: "center",
                      }}
                      key={item.proviceId}
                      onClick={() => {
                        setProvinceId(item.provinceId);
                        getCities(item.provinceId);
                        setCityId("");
                        setShowModal(false);
                        setSelectProvince(false);
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "IRANSansMobile",
                          fontWeight: 100,
                          fontSize: "0.85rem",
                          color: "#505050",
                        }}
                      >
                        {item.provinceName}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {" "}
                <TextField
                  className={classInput.root}
                  id="custom-css-standard-input"
                  label="نام شهر مورد نظر "
                  variant="outlined"
                  onChange={(text) => searchFilterCity(text)}
                />
                {cities.map((item) => {
                  return (
                    <div
                      style={{
                        borderBottom: "0.5px solid #c1c1c1",
                        width: "70%",
                        textAlign: "center",
                      }}
                      key={item.cityId}
                      onClick={() => {
                        setCityId(item.cityId);
                        setShowModal(false);
                        setSelectProvince(false);
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "IRANSansMobile",
                          fontWeight: 100,
                          fontSize: "0.85rem",
                          color: "#505050",
                        }}
                      >
                        {item.cityName}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Modal>
        <Modal
          isOpen={selectMerchant}
          onRequestClose={() => {
            setSelectMerchant(false);
          }}
          style={merchantModal}
          overlayClassName={classes.myoverlay}
          contentLabel="Example Modal"
        >
          <div className={classes.containerModal}>
            <KeyboardArrowDownRoundedIcon
              style={{ width: "15%", height: 35 }}
              onClick={() => {
                setSelectMerchant(false);
              }}
            />
            <div
              style={{
                marginTop: 30,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {merchanTypes.map((merchant) => {
                return (
                  <div
                    key={merchant.id}
                    style={{
                      borderBottom: "0.5px solid #c1c1c1",
                      width: "70%",
                      textAlign: "center",
                      padding: 10,
                    }}
                    onClick={() => {
                      setMerchantTypeId(merchant.id);
                      setMerchantType(merchant.title);
                      setSelectMerchant(false);
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "IRANSansMobile",
                        fontWeight: 100,
                        fontSize: "0.85rem",
                        color: "#505050",
                      }}
                    >
                      {merchant.title}
                    </span>{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={success ? classes.rootSuccsess : classes.root}
      />
      <NavigationBottom item="PROFILE" />
    </React.Fragment>
  );
};

export default MyStore;
