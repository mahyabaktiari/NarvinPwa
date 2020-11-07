import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import Header from "../../components/Header/Header";
import { Routes } from "../../api/api";
import axios from "axios";

const MyQrCode = (props) => {
  const [prefix, setPerfix] = useState("narvinpay.ir/Mer/");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [typeId, setTypeId] = useState("");
  const [MerchantId, setMerchandId] = useState("");
  const [profileImg, setProfileImg] = useState("");
  console.log([prefix + MerchantId]);
  console.log(prefix + MerchantId);
  console.log(`${prefix + MerchantId}`);
  const getProfileInfo = (token) => {
    axios
      .get(Routes.ProfileEdit, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let info = res.data.value.response;
        console.log(info.firstName + " " + info.lastName);
        setName(info.firstName + " " + info.lastName);
        setTypeId(info.typeId);
        setProfileImg(info.userImage);
        getMerchantId(token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    getProfileInfo(tokenStorage);
  }, []);
  const getMerchantId = (token) => {
    let merchId = "";
    axios
      .get(`${Routes.getMerchantId}/1`, {
        headers: { token: token },
      })
      .then((res) => {
        console.log(res);
        merchId = res.data.value.response.toString();
        console.log(merchId);
        setMerchandId(merchId);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <Header text="بارکد من" click={() => props.history.push("/profile")} />
      <div>
        <div
          style={{
            transform: "Rotate(90deg)",
            position: "absolute",
            top: 100,
            right: 0,
            left: 0,
            padding: "10%",
          }}
        >
          <div
            style={{
              width: "80vh",

              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <QRCode
              value={`${prefix + MerchantId}`}
              size={200}
              fgColor={"rgb(97, 12, 52)"}
              quietZone={2}
              logoImage={profileImg}
              logoWidth={40}
              logoHeight={40}
            />
            <div
              style={{
                width: 225,
                height: 205,
                backgroundColor: "#ddd",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                fontFamily: "IRANSansMobile",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                boxSizing: "border-box",
                direction: "rtl",
              }}
            >
              <span>{name}</span>
              <span
                style={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                {" "}
                برای پرداخت به {name}،کد تصویری روبرو را اسکن کنید.
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                یا این کد را وارد نمایید
              </span>
              <div
                style={{
                  width: "80%",
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                }}
              >
                <span>{MerchantId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyQrCode;
