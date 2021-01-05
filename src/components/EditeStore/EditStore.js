import React, { useEffect, useState } from "react";
import styles from "./styles";
import { requirePropFactory } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CropFreeRoundedIcon from "@material-ui/icons/CropFreeRounded";
import axios from "axios";
import { Routes } from "../../api/api";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import SubminBtn from "../SubmitButton/SubmitButton";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import DateTime from "../../components/DatePicker/DatePicker";
import NewDatePicker from "../../components/NewDatePicker/NewDatePicker";
import Snackbar from "@material-ui/core/Snackbar";
import {
  ToRial,
  getWalletBalanceAsync,
  splitInfo,
  moneySplitter,
  addMerchant,
} from "../../util/validators";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import Input from "../../components/Input/input";
import { useMapState } from "../../context/mapContext";
import MapStore from "../../components/Map/MapInStorePage";

const EditeStore = ({
  storeInfo,
  provinces,
  merchanTypes,
  getAllMerchants,
  closeModal,
}) => {
  const customStyles = {
    content: {
      width: "100%",
      height: "100vh",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      padding: 0,
      zIndex: 100,
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
      zIndex: 100,
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
      zIndex: 100,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  };
  const CssTextField = makeStyles((theme) => ({
    root: {
      marginTop: 15,
      width: "100%",
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
  console.log("storeInfo", storeInfo);
  const [Loading, setLoading] = useState(false);
  const classInput = CssTextField();
  const [storeLogo, setStoreLoge] = useState("");
  const [imgUri, setImageUri] = useState(storeInfo.storeLogo);
  const [token, setToken] = useState("");
  const [AllStores, setAllstores] = useState([]);
  const [merchantId, setMerchantId] = useState("");
  const [merchantType, setMerchantType] = useState(storeInfo.merchantType);
  const [merchanTypess, setmerchantTypes] = useState(merchanTypes);
  const [merchantTypeId, setMerchantTypeId] = useState(
    storeInfo.merchantTypeId
  );
  const [storeName, setStoreName] = useState(storeInfo.storeName);
  const [basePrice, setBasePrice] = useState(storeInfo.basePrice);
  const [storePhoneNumber, setStorPhonNumber] = useState(storeInfo.phoneNumber);
  const [mobileNumber, setMobileNumber] = useState(storeInfo.mobile);
  const [storeAddress, setStoreAddress] = useState(storeInfo.address);
  const [email, setEmail] = useState(storeInfo.email);
  const [ActivityType, setActivityType] = useState(storeInfo.activityType);
  const [IbanNumber, setIbanNumber] = useState(storeInfo.ibanNumber);
  const [AddressSite, setAddressSite] = useState(storeInfo.website);
  const [postalCode, setPostalCode] = useState(storeInfo.postalCode);
  const [BusinessCertificateNumber, setBusinessCertificateNumber] = useState(
    storeInfo.businessCertificateNumber
  );
  const [GuildCode, setGuildCode] = useState(storeInfo.guildCode);
  const [CertificateExpiryDate, setCertificateExpiryDate] = useState("");
  const [isStoreActive, setIsStoreActive] = useState("");

  const [showModal, setShowModal] = useState("");
  const [provincess, setProvinces] = useState(provinces);
  const [cities, setCities] = useState([]);
  const [selectMerchant, setSelectMerchant] = useState(false);
  const [provinceId, setProvinceId] = useState(storeInfo.cityId.substr(0, 2));
  const [cityId, setCityId] = useState(storeInfo.cityId);
  const [selectProvince, setSelectProvince] = useState("");
  const [searchCity, setSearchCity] = useState([]);
  const [searchProvince, setSearchProvince] = useState(provinces);
  const { date } = useDateState();
  const [selectedDate, setSelectedDate] = useState(
    storeInfo.certificateExpiryDate
  );
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [success, setSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const { coordinates } = useMapState();
  const [show, setShow] = useState(false);
  console.log(show);
  const classes = styles();
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getCities(tokenStorage, provinceId);
    UserLocation();
    Modal.setAppElement("body");
  }, []);

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
  function getCities(token, provinceId) {
    console.log(token, provinceId);
    axios
      .get(`${Routes.GetCity}/${provinceId}`, {
        headers: { token: token },
      })
      .then(({ data }) => {
        console.log("cities", data);
        if (data.responseCode === 200) {
          setCities(data.value.response);
          setSearchCity(data.value.response);
          // province ? setCityId("-1") : null;
          // setApiInit(false);
        } else {
          setTextSnack(data.message);
          setSnackBar(true);
        }

        //   setLoadCity(false);
      })
      .catch((err) => {
        console.log(err.response);
        //setLoadCity(false);
      });
  }

  const selectImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const readerr = new FileReader();
      readerr.addEventListener("load", () => setImageUri(readerr.result));
      readerr.readAsDataURL(e.target.files[0]);
    } else {
      setImageUri(imgUri);
    }
  };

  const Edit = () => {
    axios
      .put(
        `${Routes.updateMerchant}`,
        {
          Id: storeInfo.id,
          AccountId: storeInfo.AccountId,
          basePrice: basePrice,
          StoreName: storeName,
          StoreLogo: imgUri,
          ActivityType: ActivityType,
          PhoneNumber: storePhoneNumber,
          Mobile: mobileNumber,
          FaxNumber: "",
          PostalCode: postalCode,
          Address: storeAddress,
          Email: email,
          Website: AddressSite,
          BusinessCertificateNumber: BusinessCertificateNumber,
          GuildCode: GuildCode,
          CertificateExpiryDate: date ? date : selectedDate,
          IbanNumber: IbanNumber,
          CityId: cityId,
          MerchantTypeId: merchantTypeId,
          isActive: false,
          isDelete: false,
          lat: "0",
          long: "0",
        },
        { headers: { token: token } }
      )
      .then((res) => {
        let resCode = res.data.responseCode;
        console.log(res);
        if (resCode === 200) {
          setSuccess(true);
          setTextSnack("اطلاعات فروشگاه بروزرسانی شد.");
          setSnackBar(true);
          return setTimeout(() => {
            closeModal();
            getAllMerchants();
            setSuccess(false);
          }, 1000);
        } else {
          setTextSnack("خطا در بروزرسانی!");
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setTextSnack("بروز رسانی فروشگاه با مشکل مواجه شده است!");
        setSnackBar(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
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

  return (
    <>
      <div className={classes.modalContainer}>
        <button className={classes.btn}>
          <label for="EjareName" class="btn btn-primary btn-block btn-outlined">
            <img
              src={imgUri ? imgUri : require("../../assets/icons/profile.png")}
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
          <TextField
            className={classInput.root}
            id="custom-css-standard-input"
            label="نام فروشگاه(الزامی)"
            variant="outlined"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            autoComplete="off"
          />
          <TextField
            className={classInput.root}
            classes={{ root: classInput.root }}
            label="نوع پذیرنده"
            select
            variant="outlined"
            value={merchantTypeId}
            autoComplete="off"
            onClick={() => {
              setSelectMerchant(true);
            }}
          >
            {merchanTypess.map((merchant) => (
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
            autoComplete="off"
            value={ActivityType}
            onChange={(e) => setActivityType(e.target.value)}
          />
          <TextField
            type="tel"
            className={classInput.root}
            id="custom-css-standard-input"
            label="مبلغ پیشفرض تراکنش(ریال)"
            variant="outlined"
            autoComplete="off"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            inputProps={{
              maxLength: 11,
            }}
          />
          <TextField
            type="tel"
            className={classInput.root}
            id="custom-css-standard-input"
            label="شماره تلفن فروشگاه(الزامی)"
            variant="outlined"
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
            variant="outlined"
            value={provinceId}
            onClick={() => {
              setShowModal(true);
              setSelectProvince(true);
              setSearchProvince(provinces);
              setProvinces(provinces);
            }}
          >
            {provincess.map((option) => (
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
            autoComplete="off"
            value={cityId}
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
          <TextField
            className={classInput.root}
            id="custom-css-standard-input"
            label="آدرس فروشگاه(الزامی)"
            variant="outlined"
            autoComplete="off"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />
          {/* <TextField
            type="number"
            className={classInput.root}
            id="custom-css-standard-input"
            label={coordinates.lat ? "تغییر موقعیت فروشگاه" : "موقعیت فروشگاه"}
            variant="outlined"
            onClick={() => setShow(true)}
            inputProps={{
              readOnly: true,
            }}
          /> */}
          <input
            value={
              coordinates.lat ? "موقعیت فروشگاه ثبت شد" : "ثبت موقعیت فروشگاه"
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
            onTouchStart={() => setShow(true)}
          />
          <TextField
            type="tel"
            className={classInput.root}
            id="custom-css-standard-input"
            label="کد پستی"
            autoComplete="off"
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
              autoComplete="off"
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
                left: "5%",
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
            autoComplete="off"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classInput.root}
            id="custom-css-standard-input"
            label="آدرس سایت فروشگاه"
            variant="outlined"
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
            variant="outlined"
            value={GuildCode}
            onChange={(e) => setGuildCode(e.target.value)}
            inputProps={{
              maxLength: 10,
            }}
          />

          <NewDatePicker
            text="تاریخ انقضای جواز کسب"
            selectedDate={date ? date : selectedDate}
          />
        </div>
        <SubminBtn
          text="بروز رسانی"
          disable={
            !storeName ||
            !storePhoneNumber ||
            !mobileNumber ||
            !storeAddress ||
            !provinceId ||
            provinceId === "-1" ||
            cityId.includes("-1") ||
            !cityId
          }
          click={Edit}
        />
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
                  type="text"
                  className={classInput.root}
                  id="custom-css-standard-input"
                  variant="outlined"
                  autoComplete="off"
                  label="نام استان مورد نظر "
                  onChange={(text) => SearchFilterFunction(text)}
                />
                <div
                  style={{
                    width: "100%",
                    maxHeight: "63vh",
                    overflowY: "scroll",
                  }}
                >
                  {provincess.map((item) => {
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
                          getCities(token, item.provinceId);

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
              {merchanTypess.map((merchant) => {
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
        <Snackbar
          open={snackBar}
          autoHideDuration={5000}
          message={textSnack}
          onClose={handleClose}
          className={success ? classes.rootSuccsess : classes.root}
        />
      </div>
      <MapStore
        lat={storeInfo.lat !== "0" ? storeInfo.lat : currentLocation.lat}
        long={storeInfo.long !== "0" ? storeInfo.long : currentLocation.long}
        show={show}
        coordinates={coordinates}
        close={() => setShow(false)}
      />
    </>
  );
};

export default EditeStore;
