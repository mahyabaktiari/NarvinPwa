import React, { useState, useEffect } from "react";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import Submit from "../../components/SubmitButton/SubmitButton";
// import messaging from "../../fire";
import axios from "axios";
import { browserName, browserVersion, osVersion } from "react-device-detect";
import { Routes } from "../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import OsModal from "../../components/osOldModal/osOldModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fixNumbers } from "../../util/validators";
import Input from "../../components/Input/input";

const customStyles = {
  content: {
    width: "80%",
    height: "40vh",
    top: "30vh",
    bottom: 0,
    right: 0,
    left: "10%",
    padding: 0,
    zIndex: 10000,
  },
};

const lowModal = {
  content: {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20,
    padding: 0,
    borderRadius: 15,
    zIndex: 10000,
  },
};

const osModalStyles = {
  content: {
    width: "80%",
    height: "40vh",
    top: "30vh",
    bottom: 0,
    right: 0,
    left: "10%",
    padding: 0,
    zIndex: 10000,
    borderRadius: 15,
    backgroundColor: "#ddd",
    border: "none",
  },
};
var subtitle;

const CssTextField = withStyles({
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
      color: "#CD0448",
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
  },
})(TextField);
const Register = (props) => {
  const [phoneNum, setPhoneNum] = useState("");
  const [isPhoneNum, setIsPhoneNum] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [reagentMobile, setReagentMobile] = useState("");
  const [isReagentMobile, setIsReagentMobile] = useState(true);
  const [fcmToken, setFcmToken] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  const [openOsmodal, setOpenOsModal] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [low, setLow] = useState(false);
  const classes = styles();

  let navigator_info = window.navigator;
  let screen_info = window.screen;
  let uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";

  const phoneValidation = (e) => {
    setPhoneNum(e.target.value);
    let valid = new RegExp("^(\\+98|0)?9\\d{9}$");
    if (!valid.test(e.target.value)) {
      setIsPhoneNum(false);
    } else {
      setIsPhoneNum(true);
    }
  };
  const reagentMobileValidation = (e) => {
    setReagentMobile(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 11) {
      setIsReagentMobile(false);
    } else {
      setIsReagentMobile(true);
    }
  };

  // useEffect(() => {
  //   messaging.firebaseDependencies.installations
  //     .getToken()
  //     .then((res) => {
  //       setFcmToken(res);
  //       console.log("FCMToken", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const submitData = () => {
    if (phoneNum === "") {
      setLoading(false);
      setTextSnack("شماره موبایل نمیتواند خالی باشد!");
      setSnackBar(true);
    } else {
      if (phoneNum.length != 11) {
        setLoading(false);
        setTextSnack("شماره نامعتبر می باشد!");
        setSnackBar(true);
      } else {
        if (Number(phoneNum) === Number(reagentMobile)) {
          setLoading(false);
          setTextSnack("شماره موبایل و شماره معرف نمیتواند یکی باشد!");
          setSnackBar(true);
        } else {
          localStorage.setItem("phoneNumber", phoneNum);
          localStorage.setItem("DeviceUniqId", uid);
          localStorage.setItem("appVersoin", "1.17");
          localStorage.setItem("DeviceName", browserName);
          localStorage.setItem("DeviceModel", browserVersion);
          localStorage.setItem("osVersion", osVersion);
          axios
            .post(
              Routes.RegisterNewUser,
              {
                Mobile: phoneNum,
                ReagentMobile: reagentMobile,
                DeviceUniqId: uid,
                DeviceName: browserName,
                DeviceModel: browserVersion,
                OsVersion: osVersion,
                PushNotifToken: phoneNum,
              },
              { headers: { AppVer: "1.17" } }
            )
            .then((res) => {
              let status = res.data.responseCode;
              let response = res.data.value.response;
              setLoading(false);
              if (
                res.data.message === "شماره همراه معرف وارد شده معتبر نمی باشد"
              ) {
                setReagentMobile("");
                setTextSnack(res.data.message);
                setSnackBar(true);
              } else if (status === 403) {
                setTextSnack(res.data.message);
                setSnackBar(true);
              }
              if (response === "true" || response === "Ok") {
                props.history.push("/confirm");
              }
              if (response === "Offer") {
                props.history.push("/confirm");
              }
              if (response === "NotOk") {
                let appLink = res.data.value.appLink;
                // setIsConnectionFailed(false);
                setUrl(appLink);
                setOpenOsModal(true);
              } else {
                props.history.push("/confirm");
              }
            })
            .catch((err) => {
              setLoading(false);
              setTextSnack("خطا در برقراری ارتباط با سرویس");
              setSnackBar(true);
            });
        }
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <img
          src={require("../../assets/icons/4.png")}
          className={classes.img}
        />
        <p className={classes.text}>شماره موبایل خود را وارد کنید.</p>
        <div style={{ width: "70%" }}>
          <Input
            label="شماره موبایل"
            type="numeric"
            maxLength={13}
            change={(e) => console.log(e.target.value)}
            blur={(e) => phoneValidation(fixNumbers(e))}
            focus={() => setIsPhoneNum(true)}
          />
        </div>

        {/* <CssTextField
          className={classes.margin}
          id="custom-css-standard-input"
          label="شماره موبایل"
          type="tel"
          inputProps={{
            maxLength: 13,
          }}
          variant="outlined"
          autoComplete="off"
          onChange={(e) => console.log(e.target.value)}
          onBlur={(e) => phoneValidation(fixNumbers(e))}
          onFocus={() => setIsPhoneNum(true)}
          inputProps={{ inputMode: "numeric" }}
        /> */}
        {!isPhoneNum ? (
          <p className={classes.errorPhone}>شماره موبایل معتبر وارد کنید</p>
        ) : null}
        <span
          style={{
            fontFamily: "IRANSansMobile",
            marginRight: "auto",
            marginLeft: "auto",
            fontSize: 14,
            marginTop: 55,
            color: "#CD0448",
            textDecorationLine: "underline",
          }}
          onClick={() => setLow(true)}
        >
          شرایط استفاده از ناروین
        </span>
        <div
          className={classes.enter}
          onClick={() => {
            setopenModal(true);
            setReagentMobile("");
          }}
        >
          <p style={{ marginTop: 0, marginBottom: 0 }}>ورود شماره معرف</p>
        </div>
        {loading ? (
          <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
        ) : (
          <div
            className={classes.submitBtn}
            onClick={() => {
              setLoading(true);
              submitData();
            }}
          >
            ثبت نام
          </div>
        )}
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setopenModal(false)}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div className={classes.container}>
          <p className={classes.errorPhone}>لطفا شماره معرف را وارد نمایید.</p>
          <CssTextField
            className={classes.margin}
            id="custom-css-standard-input"
            label="شماره معرف"
            type="number"
            autoComplete="off"
            variant="outlined"
            onBlur={(e) => reagentMobileValidation(fixNumbers(e))}
            onFocus={() => setIsReagentMobile(true)}
            inputProps={{ inputMode: "numeric" }}
          />
          {!isReagentMobile ? (
            <p className={classes.errorPhone}>شماره معرف نا معتبر است</p>
          ) : null}
          <div>
            <Submit
              text="ثبت"
              click={() => {
                setopenModal(false);
              }}
              disable={!isReagentMobile}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openOsmodal}
        onRequestClose={() => setOpenOsModal(false)}
        style={osModalStyles}
        overlayClassName={classes.osOverlay}
        contentLabel="Example Modal"
      >
        <OsModal url={url} />
      </Modal>
      <Modal
        isOpen={low}
        onRequestClose={() => setLow(false)}
        style={lowModal}
        overlayClassName={classes.osOverlay}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
            overflowX: "hidden",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#CD0448",
              fontFamily: "IRANSansMobile",
              borderBottomWidth: 1,
              width: "100%",
              borderBottom: "1px solid #CD0448",
              textAlign: "center",
              padding: 10,
            }}
          >
            قوانین و مقررات
          </span>
          <span
            style={{
              fontSize: 18,
              color: "gray",
              fontFamily: "IRANSansMobile",
              width: "100%",
              textAlign: "center",
              padding: 10,
              paddingBottom: 0,
            }}
          >
            شرایط استفاده از خدمات ناروین
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 15,
                padding: "5px 20px",
                fontFamily: "IRANSansMobile",
                lineHeight: 3,
                textAlign: "right",
                direction: "rtl",
              }}
            >
              ناروین به عنوان یک سامانه ارائه‌دهنده سرویس‌های پرداخت از جمله
              خرید فروشگاه‌ی، پرداخت قبض، خرید شارژ، خرید بسته اینترنت، خرید
              بلیت اتوبوس و ... ، بوده و تابع کلیه قوانین و مقررات جمهوری اسلامی
              ایران، بانک مرکزی و شاپرک است؛ توافق‌نامه زیر در خصوص استفاده
              مناسب و ایمن از اپلیکیشن ناروین و جلوگیری از هرگونه سوءاستفاده
              احتمالی تدوین شده است. این توافق تعیین‌کننده تعهدات و تکالیف
              طرفین، بین شرکت توسعه فناوری و تجارت رستا به شماره ثبت 564390 به
              عنوان طرف اول و کاربر اپلیکیشن ناروین به عنوان طرف دوم، منعقد
              می‌شود؛ شرکت توسعه فناوری و تجارت رستا صاحب امتیاز اپلیکیشن ناروین
              است که از این پس در متن این توافقنامه «ناروین» و کاربر اپلیکیشن
              ناروین «کاربر» نامیده می‌شود.
              <br />
              تایید این شرایط استفاده به منزله قبول و امضای الکترونیکی قرارداد
              است.
              <br />* کلیه حقوق مادی و معنوی ناروین و همچنین نشانه تجاری آن
              متعلق به شرکت توسعه فناوری و تجارت رستا (سهامی خاص) به شماره ثبت
              564390 است. و هرگونه استفاده از نام، مطالب و مستندات و منابع
              ناروین بدون مجوز کتبی شرکت، مطابق با قوانین جرایم رایانه‌ای (قانون
              جرایم رایانه ای 11/11/1389 - کارگروه تعیین مصادیق محتوای مجرمانه)
              غیرمجاز تلقی شده و ناروین حق پیگرد قانونی در مراجع ذیصلاح را برای
              خود محفوظ می‌دارد. مجوز استفاده از ناروین طبق شرایط استفاده حاضر،
              تنها برای استفاده یک مشتری حقیقی و به نام آن است.
              <br />* هرگونه کپی‌برداری و سعی در نفوذ به داده‌های ناروین، طبق
              قوانین حاکم بر جمهوری اسلامی ایران غیرمجاز تلقی می‌شود و موجب
              پیگرد قانونی خواهد شد.
              <br />* کاربر حق استفاده از علایم و نشان‌های تجاری ثبت شده و ثبت
              نشده که در ناروین به نمایش در آمده است را ندارد. این ممنوعیت در
              مورد تمام اجزای فنی و غیر فنی ناروین لازم الاجرا است؛ گفتنی است
              تخطی از این ممنوعیت با عناوینی مثل صدور اجازه یا حق ضمنی و تلویحی،
              یا عدم انکار پس از قبول و غیره قابل توجیه نیست.
              <br />* هرگونه استفاده از خدمات اپلیکشین ناروین که طبق قوانین
              موضوعه کشور از قبیل قانون تجارت الکترونیک، قانون جرائم رایانه ای و
              قانون مجازات اسلامی رفتار یا عمل مجرمانه محسوب شود، ممنوع است.
            </span>
            <span
              style={{
                fontSize: 15,
                padding: "5px 20px",
                fontFamily: "IRANSansMobile",
                lineHeight: 3,
                textAlign: "right",
                direction: "rtl",
              }}
            >
              - خرید و فروش اموال غیرمنقول.
              <br />- خرید و فروش کارت‌های بخت‌آزمایی، و شرکت در هر گونه قمار و
              شرط‌‌بندی.
              <br />- خرید و فروش اکانت استفاده از شبکه خصوصی مجازی (VPN) و
              همچنین نرم افزارهای عبور از فیلترینگ جمهوری اسلامی ایران.
              <br />- خرید و فروش امتیاز استفاده از خدمات، جهت هرگونه هک و نفوذ
              و دسترسی غیرمجاز.
              <br />- خرید و فروش کالاهایی که به نحوی حقوق ناشر، مالک، مولف،
              پدیدآورنده اثر و امثال آنها را رعایت نمی‌‌کنند (خلاف قوانین
              کپی‌رایت).
              <br />- خرید و فروش سیگار و سایر مواد دخانی.
              <br />- خرید و فروش انواع سلاح‌های گرم و سرد.
              <br />- خرید و فروش کالاها و خدماتی که مبادله آن‌ها دارای مقررات و
              نظامات خاص است.
              <br />- خرید و فروش کالاهایی که برای مصرف‌کننده خطر جدی در پی
              دارد.
              <br />- خرید و فروش کالاهایی که مبادله آن‌ها طبق قانون ممنوع است
              از قبیل مواد مخدر، مشروبات الکلی، روان گردان ها، مواد سکرآور،
              کالاهای قاچاق.
              <br />- خرید و فروش کالاهایی که مبادله آن‌ها مغایر با آداب اسلامی
              است.
              <br />- خرید و فروش کالاها و خدماتی که انجام فعالیت‌های غیرقانونی
              را به نحوی تشویق یا تسهیل می‌کنند.
              <br />- خرید و فروش کالاهای به‌دست‌آمده از ارتکاب جرم یا نقض
              مقررات کشوری و لشگری.
              <br />- خرید و فروش کلیه کالاها یا خدماتی که ارائه آنها نیازمند
              اخذ مجوز یا پروانه است.
              <br />- خرید و فروش کلیه کالاها یا خدماتی که ناقض حقوق بشر می
              باشند.
              <br />- خرید و فروش کلیه کالاها یا خدماتی که ناقض قوانین حفاظت از
              محیط زیست می باشند.
            </span>
            <span
              style={{
                fontSize: 14,
                padding: "5px 20px",
                fontFamily: "IRANSansMobile",
                lineHeight: 3,
                textAlign: "right",
                direction: "rtl",
              }}
            >
              * هرگونه اقدامی که به تشخیص ناروین منجر به صدور دستور برخورد با
              مشتری توسط مراجع قضایی، انتظامی یا امنیتی در رابطه با تخلفات
              حوزه‌ی پرداخت الکترونیک شود، باعث توقف ارائه خدمات به کاربر خواهد
              شد.
              <br />* انجام اعمال مرتبط با سوءاستفاده مالی و پولشویی یا ایجاد
              اختلال در حوزه پولی و بانکی کشور به تشخیص ناروین، باعث توقف ارائه
              خدمات به کاربر خواهد شد.
              <br />* فعالیت‌های منجر به اختلال در جریان نقدینگی، به تشخیص
              ناروین باعث توقف ارائه خدمات به کاربر خواهد شد.
              <br />* کاربر ضمن این قرارداد به ناروین اجازه می‌دهد که هرگونه
              استعلامی از سوی هر یک از مراجع رسمی کشور در خصوص اطلاعات کاربر را
              پاسخ دهد؛ کاربر حق اعتراض نسبت به اعلام اطلاعات خویش به مراجع رسمی
              را نخواهد داشت.
              <br />* پیشنهاد میگردد، ناروین را تنها از طریق مراجعه به وب سایت
              رسمی آن یا فروشگاه اندرویدی "کافه‌بازار" ، "مایکت" ، "چارخونه" یا
              "Google Play" دریافت و نصب کنید.
              <br />* کاربر مسئول حفظ و مراقبت از رمز ورود و کد کاربری خود است و
              چنانچه بر اثر عدم حفاظت و یا افشای کاربر از این اطلاعات خسارتی به
              او وارد شود، ناروین در این مورد مسئولیتی نخواهد داشت. کاربر ناروین
              مکلف است در صورت مفقود شدن و یا سرقت گوشی بلافاصله مراتب را به
              مرکز امداد مشتریان شرکت ناروین اعلام کند تا حساب تعریف شده در
              ناروین غیرفعال شود. لازم به ذکر است در هر صورت ناروین هیچ‌گونه
              مسئولیتی در خصوص سو استفاده و برداشت از حساب کاربران ندارد.
              <br />* بدیهی است ناروین خود را متعهد می‌داند تمام تلاش و ظرفیت
              خویش را جهت حفظ امنیت اپلیکیشن به کار گیرد؛ با این وجود توصیه
              می‌شود کاربر بصورت دوره‌ای نسبت به تغییر رمز خود اقدام کند. همچنین
              کاربر نباید به هیچ وجه رمز خود را بر روی گوشی تلفن همراه ذخیره کند
              و یا در اختیار دیگران قرار دهد. به طور کلی کاربر باید کلیه اطلاعات
              خویش را محفوظ نگه دارد؛ در صورت سهل‌انگاری کاربر در این زمینه،
              مسئولیتی متوجه ناروین نخواهد بود.
              <br />* کاربر باید پیش از واگذاری گوشی تلفن همراه خود، اپلیکیشن
              ناروین از روی گوشی حذف کند. با این کار کلیه اطلاعات حساب‌های ثبت
              شده و نیز پیام‌های دریافتی موجود بر روی گوشی از بین می‌روند.
              <br />* در مواردی كه ناروین بنا به عللی از قبیل وجود مشکلات قادر
              به ارائه خدمات نباشد، مسئولیتی متوجه ناروین نخواهد بود و کاربر به
              هیچ عنوان نمی تواند ادعای خسارت کند.
              <br />* ناروین بابت خسارات احتمالی وارده به کاربر و یا مشکلات خارج
              از حدود اختیارات خود از قبیل قطع خطوط ارتباطی، شبکه اینترنتی،
              وب‌سرویس‌ها و سایر موارد هیچگونه مسئولیتی نخواهد داشت.
              <br />* ناروین می‌تواند هر زمان كه صلاح بداند در شرایط و مقررات
              ناروین تغییرات لازم را اعمال کند. این تغییرات به نحو مقتضی به
              اطلاع کاربر می‌رسد و کاربر موظف به رعایت و اجرای آن از زمان اطلاع
              می‌باشد.
              <br />* جهت بهبود کیفیت و امنیت سرویس رسانی ناروین، اطلاعات
              سخت‌افزار گوشی موبایل، سیستم عامل و همچنین اطلاعات سیم کارت کاربر
              در سیستم ذخیره می‌شود.
              <br />* اطلاعات موقعیت جغرافیایی فروشگاه، برای نمایش بهتر آن در
              نقشه به صورت دلخواه دریافت و در سیستم ذخیره می شود.
              <br />* در صورت تعریف فروشگاه در ناروین، تا دریافت کامل مدارک و
              مستندات، فروشگاه غیرفعال خواهد بود و صرفاً زمانی فعال خواهد شد که
              نماینده ناروین در محل پذیرنده حاضر شده و تمامی مدارک مورد نیاز را
              دریافت نموده و اصالت آنها را احراز نماید.
              <br />* امکان برداشت وجه از کیف پول زمانی ممکن خواهد بود که کاربر
              شماره شبای خود را تکمیل کرده و اصالت آن از طرف ناروین احراز شده
              باشد.
              <br />* سقف انتقال وجه بین کیف پول کاربر و کیف پول کاربران دیگر،
              روزانه 2.000.000 ریال و حداکثر تعداد انتقال وجه روزانه 10 بار می
              باشد.
              <br />* در صورت عدم رضایت کاربر از عملکرد ناروین، کاربر می‌تواند
              اطلاعات عضویت خود را لغو کند. بدیهی است لغو عضویت باعث حذف اطلاعات
              کاربر در برنامه موبایل می¬شود، اما عملیات گذشته کاربر بنا به دلایل
              امنیتی و سوابق موضوع و نیز به منظور بهبود عملکرد سیستم در سرورهای
              ناروین باقی می‌ماند.
              <br />* در صورت عدم رعایت مقررات و شرایط عمومی و اختصاصی استفاده
              از ناروین و همچنین استفاده غیرمجاز، ناروین حق دارد که سرویس‌دهی به
              مشترک را متوقف کند. همچنین می‌تواند هرگونه اطلاعات کاربر یا سو
              استفاده از سرویس را به مراجع رسمی و نظارتی و قضایی اعلام کند.
              چنانچه به دلیل قصور یا تقصیر کاربر ادعایی علیه ناروین مطرح شود یا
              هرگونه خسارتی به شرکت وارد آید ناروین می‌تواند کلیه خسارات مزبور
              را از کاربر مربوطه مطالبه کند.
              <br />* ناروین متعهد به رعایت کلیه قوانین از قبیل فهرست مصادیق
              محتوای مجرمانه موضوع ماده ۲۱ قانون جرایم رایانه‌ای و قانون تجارت
              الکترونیکی است و بنابراین کلیه موضوعات مشكوك و اطلاعات مربوط به
              اشخاص مظنون به سوء استفاده از ناروین را به مقامات انتظامی ‌و قضائی
              اعلام می‌کند تا تحت پیگرد قانونی قرار گیرند.
              <br />* توصیه می‌شود کاربر در صورت مشاهده هرگونه عملیات غیر مجاز
              بر روی حساب خود، در اسرع وقت نسبت به تغییر رمز و غیرفعال سازی
              سیستم اقدام نموده و مراتب را به پشتیبانی ناروین اطلاع دهد.
            </span>
          </div>
          <button
            style={{
              backgroundColor: "#610c34",
              borderRadius: 10,
              color: "#fff",
              margin: "10px 0px",
              border: "none",
              padding: 15,
            }}
            onClick={() => setLow(false)}
          >
            <span
              style={{
                fontFamily: "IRANSansMobile",
                color: "#fff",
                fontSize: 16,
              }}
            >
              مطالعه نموندم
            </span>
          </button>
        </div>
      </Modal>
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
    </div>
  );
};

export default Register;
