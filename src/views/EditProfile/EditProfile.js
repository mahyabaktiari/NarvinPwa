import React, { useEffect, useState } from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SubminBtn from "../../components/SubmitButton/SubmitButton";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Routes } from "../../api/api";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { faLaravel } from "@fortawesome/free-brands-svg-icons";
import DateTime from "../../components/DatePicker/DatePicker";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
const customStyles = {
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
const EditProfile = (props) => {
  const CssTextField = makeStyles({
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
  });
  const classes = styles();
  const classInput = CssTextField();
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgUri, setImageUri] = useState("");
  const [userImage, setUserImage] = useState("");
  const [Iban, setIban] = useState("");
  const [isIbanVerify, setIsIbanVerify] = useState(false);
  const [depositId, setDepositId] = useState("");
  const [nationalcode, setNationalCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadCity, setLoadCity] = useState(false);
  const [isDataSubmited, setIsDataSubmited] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [logoModal, setLogoModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceid] = useState("");
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState("");
  const [selectCity, setSelectCity] = useState(false);
  const [selectProvince, setSelectProvince] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [searchProvince, setSearchProvince] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [backdrop, setBackdrop] = useState(true);
  const { date } = useDateState();
  const [success, setSuccess] = useState(false);

  console.log("date", date);
  console.log(provinceId, cityId, provinces);
  useEffect(() => {
    let tokenStorege = localStorage.getItem("token");
    setPhoneNum(localStorage.getItem("phoneNumber"));
    setToken(tokenStorege);
    getProfileInfo(tokenStorege);
  }, []);

  const handleChange = (event) => {
    setProvinceid(event.target.value);
  };

  const ChangeCity = (event) => {
    setCityId(event.target.value);
  };

  const getProfileInfo = (token) => {
    axios
      .get(Routes.ProfileEdit, { headers: { token: token } })
      .then((res) => {
        console.log(res.data.value.response);
        //setLoading(false);
        let info = res.data.value.response;
        setFirstName(info.firstName);
        setLastName(info.lastName);
        setIsIbanVerify(info.ibanNumberIsVerified);
        setDepositId(info.depositId);
        setNationalCode(info.nationalCode);
        setImageUri(info.userImage);
        setEmail(info.email);
        let proviceId = info.cityId ? info.cityId.substr(0, 2) : "";
        info.cityId
          ? setProvinceid(info.cityId.substr(0, 2))
          : setProvinceid("");
        setCityId(info.cityId);
        info.ibanNumber == null
          ? setIban("")
          : setIban(info.ibanNumber.split("IR").pop());
        setSelectedDate(info.birthDate);
        getProvinces(token, proviceId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCities = (token, id) => {
    console.log(provinceId);
    axios
      .get(`${Routes.GetCity}/${id}`, { headers: { token: token } })
      .then(({ data }) => {
        setLoadCity(false);
        console.log(data);
        setBackdrop(false);
        if (data.responseCode === 200) {
          setCities(data.value.response);
          setSearchCity(data.value.response);
          console.log(cityId);
        } else if (data.responseCode === 404) {
          return;
        } else {
          // Toast.show(data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
        }
      })
      .catch((err) => {
        console.log(err.response);
        setBackdrop(false);
      });
  };

  const getProvinces = (token, id) => {
    axios
      .get(`${Routes.GetProvinces}`, {
        headers: { token: token },
      })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          setProvinces(res.data.value.response);
          setSearchProvince(res.data.value.response);
          console.log(res);
          getCities(token, id);
        } else {
          setTextSnack(res.data.message);
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setTextSnack(err.data.message);
        setSnackBar(true);
      });
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

  const handleSubmit = () => {
    if (
      firstName == null ||
      firstName === "" ||
      lastName === "" ||
      lastName == null
    ) {
      setTextSnack("نام و نام خانوادگی الزامی است!");
      setSnackBar(true);
    } else if (nationalcode === "" || nationalcode == null) {
      setTextSnack("شماره ملی الزامی است!");
      setSnackBar(true);
    } else if (provinceId == "-1" || provinceId == null) {
      setTextSnack("انتخاب استان الزامی است!");
      setSnackBar(true);
    } else if (cityId.substr(2, 2) == "-1" || cityId == null) {
      setTextSnack("انتخاب شهر الزامی است!");
      setSnackBar(true);
    } else if (Iban !== "" && Iban.length < 24) {
      setTextSnack("شماره شبا نامعتبر!");
      setSnackBar(true);
    } else {
      localStorage.setItem("name", firstName);
      console.log(
        "firstName :",
        firstName,
        "lastName :",
        lastName,
        "natinalcode :",
        nationalcode,
        "date :",
        date === 0 ? selectedDate : date,
        "userImage :",
        imgUri,
        "depositId :",
        depositId,
        "Iban :",
        Iban,
        "cityId :",
        cityId,
        "email :",
        email
      );
      axios
        .put(
          Routes.ProfileEdit,
          {
            FirstName: firstName,
            LastName: lastName,
            NationalCode: nationalcode,
            BirthDate: date === 0 ? selectedDate : date,
            UserImage: imgUri,
            DepositId: depositId,
            IbanNumber: Iban != "" ? "IR" + Iban : null,
            cityId: cityId,
            email: email,
          },
          { headers: { token: token } }
        )
        .then((res) => {
          console.log(res);
          setSuccess(true);
          setTextSnack("اطلاعات با موفقیت ثبت شد.");
          setSnackBar(true);
          localStorage.setItem("province", provinceId);
          localStorage.setItem("city", cityId);
          setTimeout(() => {
            props.history.push("/profile");
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response);
          setTextSnack("مشکل در ثبت اطلاعات کاربری!");
          setSnackBar(true);
        });
    }
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar(false);
  };
  console.log(selectedDate);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header
          text="ویرایش مشخصات"
          click={() => props.history.push("/profile")}
        />
        <button className={classes.btn}>
          <label for="EjareName" class="btn btn-primary btn-block btn-outlined">
            <img src={imgUri} className={classes.img} />
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
        <div className={classes.phone}>
          <p className={classes.phoneTxt}>{phoneNum}</p>
          <PhoneIphoneOutlinedIcon />
        </div>
        <TextField
          className={classInput.root}
          id="custom-css-standard-input"
          label="نام(الزامی)"
          variant="outlined"
          value={firstName}
          onChange={(text) => setFirstName(text.target.value)}
        />
        <TextField
          className={classInput.root}
          id="custom-css-standard-input"
          label="نام خانوادگی(الزامی)"
          variant="outlined"
          value={lastName}
          onChange={(text) => setLastName(text.target.value)}
        />
        <TextField
          className={classInput.root}
          id="custom-css-standard-input"
          label="ایمیل"
          variant="outlined"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
        />
        <TextField
          className={classInput.root}
          id="custom-css-standard-input"
          label="شماره ملی(الزامی)"
          variant="outlined"
          value={nationalcode}
          onChange={(text) => setNationalCode(text.target.value)}
          inputProps={{
            maxLength: 10,
          }}
        />
        {/* <TextField
          className={classInput.root}
          id="custom-css-standard-input"
          label="تاریخ تولد(الزامی)"
          variant="outlined"
          value={selectedDate}
        /> */}
        {selectedDate ? (
          <DateTime text="تاریخ تولد" selectedDate={selectedDate} />
        ) : null}
        <div
          style={{ width: "100%", marginRight: "30%", position: "relative" }}
        >
          <TextField
            className={classInput.root}
            id="custom-css-standard-input"
            label="شماره شبا"
            variant="outlined"
            value={Iban}
            onChange={(text) => setIban(text.target.value)}
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
          label="شناسه واریز"
          variant="outlined"
          value={depositId}
          onChange={(text) => setDepositId(text.target.value)}
        />
        <TextField
          className={classInput.root}
          classes={{ root: classInput.root }}
          label="استان"
          select
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
          label="شهر"
          variant="outlined"
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
        <SubminBtn
          text="ثبت اطلاعات"
          disable={
            !firstName ||
            !lastName ||
            !nationalcode ||
            !provinceId ||
            !cityId ||
            cityId.includes("-1")
          }
          click={handleSubmit}
        />
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
          setSelectProvince(false);
        }}
        style={customStyles}
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
                      setProvinceid(item.provinceId);
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
      <Backdrop
        className={classes.backdrop}
        open={backdrop}
        onClick={() => setBackdrop(false)}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={success ? classes.rootSuccsess : classes.root}
      />
      {!showModal ? <NavigationBottom item="PROFILE" /> : null}
    </React.Fragment>
  );
};

export default EditProfile;
