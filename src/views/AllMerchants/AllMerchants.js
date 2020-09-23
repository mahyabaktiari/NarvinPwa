import React from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
const AllMerchants = (props) => {
  const classes = styles();
  return (
    <React.Fragment>
      <Header
        text="لیست فروشندگان منتخب"
        click={() => props.history.push("/services")}
      />
      <div className={classes.container}>
        <div className={classes.btn}>
          <p style={{ margin: 10 }}>مشاهده پذیرندگان در نقشه</p>
        </div>
        <div className={classes.store}>
          <div className={classes.info}>
            <p style={{ marginTop: 4, marginBottom: 4 }}>کد پذیرنده: 1212133</p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نام فروشگاه: جادوی شمال
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              آدرس: قائم شهر ، خیابان البرز
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              شماره تلفن : 09125979838
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نوع فعالیت : تولید نرم افزار
            </p>
          </div>
          <div
            className={classes.logo}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 10 }}
            >
              <img
                src={require("../../assets/icons/circLogo.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.store}>
          <div className={classes.info}>
            <p style={{ marginTop: 4, marginBottom: 4 }}>کد پذیرنده: 1212133</p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نام فروشگاه: جادوی شمال
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              آدرس: قائم شهر ، خیابان البرز
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              شماره تلفن : 09125979838
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نوع فعالیت : تولید نرم افزار
            </p>
          </div>
          <div
            className={classes.logo}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 10 }}
            >
              <img
                src={require("../../assets/icons/circLogo.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.store}>
          <div className={classes.info}>
            <p style={{ marginTop: 4, marginBottom: 4 }}>کد پذیرنده: 1212133</p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نام فروشگاه: جادوی شمال
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              آدرس: قائم شهر ، خیابان البرز
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              شماره تلفن : 09125979838
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نوع فعالیت : تولید نرم افزار
            </p>
          </div>
          <div
            className={classes.logo}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 10 }}
            >
              <img
                src={require("../../assets/icons/circLogo.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.store}>
          <div className={classes.info}>
            <p style={{ marginTop: 4, marginBottom: 4 }}>کد پذیرنده: 1212133</p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نام فروشگاه: جادوی شمال
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              آدرس: قائم شهر ، خیابان البرز
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              شماره تلفن : 09125979838
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نوع فعالیت : تولید نرم افزار
            </p>
          </div>
          <div
            className={classes.logo}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 10 }}
            >
              <img
                src={require("../../assets/icons/circLogo.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default AllMerchants;
