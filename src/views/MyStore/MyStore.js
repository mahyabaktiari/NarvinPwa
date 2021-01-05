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
import NewDatePicker from "../../components/NewDatePicker/NewDatePicker";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import Snackbar from "@material-ui/core/Snackbar";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";
import Input from "../../components/Input/input";
import CircularProgress from "@material-ui/core/CircularProgress";
import MapStore from "../../components/Map/MapInStorePage";
import { useMapState } from "../../context/mapContext";
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
      width: "100%",
      zIndex: 0,
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
        zIndex: 0,
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
        "& .MuiOutlinedInput-input": {
          padding: "18.5px 14px 11px",
        },
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
  const [loading, setLoading] = useState(true);
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
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [back, setBack] = useState(false);

  const { date } = useDateState();
  const dispatch = useDateDispatch();
  const { coordinates } = useMapState();
  console.log(coordinates);
  const [showMap, setShowMap] = useState(false);
  console.log("date", date);
  console.log(AllStores);

  useEffect(() => {
    let tokenStorege = localStorage.getItem("token");
    setToken(tokenStorege);
    console.log(tokenStorege);
    getAllMerchants(tokenStorege);
    getMerchantTypes(tokenStorege);
    getProvinces(tokenStorege);
    UserLocation();
    dispatch({ type: "RESET" });
  }, []);

  const getAllMerchants = (tokenStorege) => {
    //2 = get the list of user stores
    setLoading(true);
    axios
      .get(`${Routes.GetMerchantList}`, { headers: { token: tokenStorege } })
      .then((res) => {
        console.log(res);
        setAllstores(res.data.value.response);
        setLoading(false);
      })
      .catch((err) => {
        setTextSnack("بازیابی فروشگاه ها با خطا مواجه شد!");
        setSnackBar(true);
        setLoading(true);
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

  const UserLocation = () => {
    axios
      .get(
        "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0"
      )
      .then(async (res) => {
        console.log(res.data);
        await setCurrentLocation({
          lat: res.data.latitude,
          long: res.data.longitude,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        coordinates,
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

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  window.onpopstate = () => {
    setBack(true);
  };
  useEffect(() => {
    back ? popStateListener() : console.log("false");
  }, [back]);
  var backButtonPrevented = false;

  function popStateListener(event) {
    console.log("BACK");
    if (backButtonPrevented === false) {
      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );
      backButtonPrevented = true;
      setBack(false);
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }
  return (
    <>
      <div className={classes.container}>
        <Header
          text="فروشگاه من"
          click={() => {
            dispatch({ type: "RESET" });
            props.history.push("/profile");
          }}
        />
        <div className={classes.addStore} onClick={() => setOpen(true)}>
          <AddRoundedIcon />
          <p style={{ margin: 0, marginTop: 5, paddingLeft: 10 }}>
            {" "}
            افزودن فروشگاه
          </p>
        </div>
        <div>
          {loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                color="secondary"
                style={{ marginTop: "20%" }}
              />
            </div>
          ) : (
            AllStores.map((storeInfo) => {
              return (
                <Store
                  storeInfo={storeInfo}
                  token={token}
                  provinces={provinces}
                  merchanTypes={merchanTypes}
                  getAllMerchants={() => getAllMerchants(token)}
                />
              );
            })
          )}
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
            <div
              style={{
                display: "flex",
                width: "70%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Input
                label="نام فروشگاه(الزامی)"
                value={storeName}
                change={(e) => setStoreName(e.target.value)}
                type="search"
              />
              <TextField
                className={classInput.root}
                classes={{ root: classInput.root }}
                label="نوع پذیرنده"
                autoComplete="off"
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
              <Input
                label="نوع فعالیت"
                value={ActivityType}
                change={(e) => setActivityType(e.target.value)}
                type="search"
              />
              <Input
                label="مبلغ پیشفرض تراکنش(ریال)"
                value={ToRial(basePrice)}
                change={(e) => setBasePrice(e.target.value)}
                maxLength={11}
              />
              <Input
                label="شماره تلفن فروشگاه(الزامی)"
                value={storePhoneNumber}
                change={(e) => setStorPhonNumber(e.target.value)}
                maxLength={11}
                type="tel"
              />
              <Input
                label="شماره موبایل(الزامی)"
                value={mobileNumber}
                change={(e) => setMobileNumber(e.target.value)}
                maxLength={11}
                type="tel"
              />

              <TextField
                className={classInput.root}
                classes={{ root: classInput.root }}
                label="استان(الزامی)"
                select
                autoComplete="off"
                variant="outlined"
                value={provinceId}
                onClick={() => {
                  setShowModal(true);
                  setSelectProvince(true);
                  setProvinces(searchProvince);
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
                autoComplete="off"
                onClick={() => {
                  setShowModal(true);
                  setCities(searchCity);
                }}
              >
                {cities.map((option) => (
                  <MenuItem key={option.cityId} value={option.cityId}>
                    {option.cityName}
                  </MenuItem>
                ))}
              </TextField>

              <Input
                label="آدرس فروشگاه(الزامی)"
                value={storeAddress}
                change={(e) => setStoreAddress(e.target.value)}
                type="search"
              />
              {/* <Input
                label={coordinates.lat ? "ثبت موقعیت جدید" : "موقعیت فروشگاه"}
                readOnly={true}
                click={() => setShowMap(true)}
              /> */}
              <input
                value={
                  coordinates.lat
                    ? "موقعیت فروشگاه ثبت شد"
                    : "ثبت موقعیت فروشگاه"
                }
                style={{
                  width: "100%",
                  marginTop: 10,
                  border: "1px solid gray",
                  borderRadius: 5,
                  boxSizing: "border-box",
                  padding: 10,
                  fontFamily: "IRANSansMobile",
                  textAlign: "center",
                  color: coordinates.lat ? "green" : "gray",
                }}
                readOnly
                onTouchStart={() => setShowMap(true)}
              />
              <Input
                label="کد پستی"
                value={postalCode}
                change={(e) => setPostalCode(e.target.value)}
                maxLength={10}
              />

              <div
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Input
                  label="شماره شبا"
                  value={IbanNumber}
                  change={(e) => setIbanNumber(e.target.value)}
                  maxLength={24}
                />
                <span
                  style={{
                    position: "absolute",
                    color: "lightgray",
                    top: "50%",
                    left: "5%",
                    fontSize: "1rem",
                  }}
                >
                  IR
                </span>
              </div>
              <Input
                label="ایمیل"
                value={email}
                change={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Input
                label="آدرس سایت فروشگاه"
                value={AddressSite}
                change={(e) => setAddressSite(e.target.value)}
                maxLength={30}
                type="search"
              />
              <Input
                label="شماره جواز کسب و کار"
                value={BusinessCertificateNumber}
                change={(e) => setBusinessCertificateNumber(e.target.value)}
                maxLength={10}
              />
              <Input
                label="شماره صنفی"
                value={GuildCode}
                change={(e) => setGuildCode(e.target.value)}
                maxLength={10}
              />
              <NewDatePicker text="تاریخ انقضای جواز کسب" selectedDate={date} />
            </div>

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
                  width: "70%",
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
                  autoComplete="off"
                  variant="outlined"
                  onChange={(text) => SearchFilterFunction(text)}
                />
                <div
                  style={{
                    width: "100%",
                    maxHeight: "63vh",
                    overflowY: "scroll",
                  }}
                >
                  {provinces.map((item) => {
                    return (
                      <div
                        style={{
                          borderBottom: "0.5px solid #c1c1c1",
                          width: "100%",
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
              </div>
            ) : (
              <div
                style={{
                  width: "70%",
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
                  autoComplete="off"
                  variant="outlined"
                  onChange={(text) => searchFilterCity(text)}
                />
                <div
                  style={{
                    width: "100%",
                    maxHeight: "63vh",
                    overflowY: "scroll",
                  }}
                >
                  {cities.map((item) => {
                    return (
                      <div
                        style={{
                          borderBottom: "0.5px solid #c1c1c1",
                          width: "100%",
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
      <MapStore
        lat={currentLocation.lat}
        long={currentLocation.long}
        show={showMap}
        coordinates={coordinates}
        close={() => setShowMap(false)}
      />
      <NavigationBottom item="PROFILE" />
    </>
  );
};

export default MyStore;
