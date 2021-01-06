import React, { useEffect, useState, useCallback } from "react";
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
import Input from "../../components/Input/input";
import NewDatePicker from "../../components/NewDatePicker/NewDatePicker";
import Cropper from "react-easy-crop";
import { getCroppedImg, getRotatedImage } from "../../util/canvasUtils";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
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
const modalStyle = {
  content: {
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000000,
    padding: 0,
  },
};
const EditProfile = (props) => {
  const CssTextField = makeStyles({
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
  const [selectedDate, setSelectedDate] = useState(date);
  const [success, setSuccess] = useState(false);
  const [back, setBack] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [aspect, setAspect] = useState(4 / 3);
  const [cropModal, setCropModal] = useState(false);
  const dispatch = useDateDispatch();
  const [image, setImage] = useState("");

  console.log("date", date);
  useEffect(() => {
    let tokenStorege = localStorage.getItem("token");
    setPhoneNum(localStorage.getItem("phoneNumber"));
    setToken(tokenStorege);
    getProfileInfo(tokenStorege);
  }, []);

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
        setImage(info.userImage);
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
          setTextSnack(data.message);
          setSnackBar(true);
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
        setTextSnack("خطا در اتصال به سرور");
        setSnackBar(true);
      });
  };

  const selectImg = (e) => {
    console.log(e);
    if (e.target.files && e.target.files.length > 0) {
      const readerr = new FileReader();
      readerr.addEventListener("load", () => setImageUri(readerr.result));
      readerr.readAsDataURL(e.target.files[0]);
      console.log(readerr.result);
      setImageUri(readerr.result);
      setCropModal(true);
    } else {
      setImageUri(imgUri);
      setCropModal(true);
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
        imgUri.split(","),
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
            UserImage: croppedImage.split(",")[1],
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
          dispatch({ type: "RESET" });
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
  console.log("img", imgUri);
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgUri,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      let img = croppedImage;
      console.log(img);
      setCroppedImage(croppedImage);
      setCropModal(false);
    } catch (e) {
      console.error(e);
    }
  }, [imgUri, croppedAreaPixels, rotation]);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header
          text="ویرایش مشخصات"
          click={() => {
            props.history.push("/profile");
            dispatch({ type: "RESET" });
          }}
        />
        <button className={classes.btn}>
          <label for="EjareName" class="btn btn-primary btn-block btn-outlined">
            <img
              src={croppedImage ? croppedImage : image}
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
            }}
          />
        </button>
        <div className={classes.phone}>
          <p className={classes.phoneTxt}>{phoneNum}</p>
          <PhoneIphoneOutlinedIcon />
        </div>
        <div
          style={{
            display: "flex",
            width: "70%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            label="نام(الزامی)"
            value={firstName}
            change={(text) => setFirstName(text.target.value)}
            type="search"
          />
          <Input
            label="نام خانوادگی(الزامی)"
            value={lastName}
            change={(text) => setLastName(text.target.value)}
            type="search"
          />
          <Input
            label="ایمیل"
            value={email}
            change={(text) => setEmail(text.target.value)}
            type="email"
          />
          <Input
            label="شماره ملی(الزامی)"
            value={nationalcode}
            change={(text) => setNationalCode(text.target.value)}
            maxLength={10}
          />
          {selectedDate ? (
            <NewDatePicker
              text="تاریخ تولد"
              selectedDate={date ? date : selectedDate}
            />
          ) : null}
          <div style={{ width: "100%", position: "relative" }}>
            <Input
              label="شماره شبا"
              value={Iban}
              change={(text) => setIban(text.target.value)}
              maxLength={24}
            />
            <span
              style={{
                position: "absolute",
                color: "lightgray",
                top: 29,
                left: "5%",
                fontSize: 16,
              }}
            >
              IR
            </span>
          </div>
          <Input
            label="شناسه واریز"
            value={depositId}
            change={(text) => setDepositId(text.target.value)}
          />
          <TextField
            className={classInput.root}
            classes={{ root: classInput.root }}
            label="استان"
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
            label="شهر"
            autoComplete="off"
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
        </div>

        <SubminBtn
          text="ثبت اطلاعات"
          disable={
            !firstName ||
            !lastName ||
            !nationalcode ||
            !provinceId ||
            !cityId ||
            cityId.includes("-1") ||
            !selectedDate
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
      <NewDatePicker />
      <Modal
        isOpen={cropModal}
        onRequestClose={() => {
          setCropModal(false);
          setCroppedImage("");
        }}
        style={modalStyle}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <Header
          text="تنظیم اندازه عکس"
          click={() => {
            setCropModal(false);
            setCroppedImage("");
          }}
        />
        <div className={classes.cropContainer}>
          <Cropper
            image={imgUri}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={(e) => setCrop(e)}
            onCropComplete={onCropComplete}
            onZoomChange={(e) => setZoom(e)}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ container: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
              color="secondary"
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SubminBtn
            text="ثبت تصویر"
            click={() => {
              showCroppedImage();
            }}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditProfile;
