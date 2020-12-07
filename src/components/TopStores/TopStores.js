import React, { useEffect, useState } from "react";
import Map from "../Map/MaPComponent";
import { useMapDispatch, useMapState } from "../../context/mapContext";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import SubdirectoryArrowLeftRoundedIcon from "@material-ui/icons/SubdirectoryArrowLeftRounded";
const TopStore = (props) => {
  const { stores } = props;
  const [showMap, setShowMap] = useState(false);
  const openMap = (topStore, dispatch) => {
    if (
      topStore.lat &&
      topStore.long &&
      topStore.lat != 0 &&
      topStore.long != 0
    ) {
      dispatch({
        type: "SHOW_MAP",
        // coordinates: { lat: Number(topStore.lat), long: Number(topStore.long) },
        storeInfo: {
          // title: topStore.storeName,
          // description: topStore.activityType,
          showMyLocation: false,
          showStore: true,
        },
      });
    } else {
      return;
    }
  };

  const dispatch = useMapDispatch();
  const { mapVisible, coordinates, storeInfo } = useMapState();

  return (
    <>
      <div
        style={{
          display: "flex",
          border: "1px solid gray",
          width: "96%",
          borderRadius: 15,
          marginTop: 10,
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div
            style={{
              width: "80%",
              fontFamily: "IRANSansMobile",
              fontWeight: 400,
              textAlign: "right",
              padding: "10px 10px",
              fontSize: 13,
              direction: "rtl",
            }}
          >
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              کد پذیرنده: {stores.id}
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نام فروشگاه: {stores.storeName}
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              آدرس : {stores.address}
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              شماره تلفن : {stores.phoneNumber}
            </p>
            <p style={{ marginTop: 4, marginBottom: 4 }}>
              نوع فعالیت :{stores.activityType ? stores.activityType : "---"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            <div
              style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 10 }}
            >
              <img
                src={stores.storeLogo}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {stores.website ? (
            <div
              style={{
                width: "85%",
                display: "flex",
                border: "1px solid #c3c3c3",
                borderRadius: 20,
                direction: "rtl",
                padding: 5,
                boxSizing: "border-box",
                alignItems: "center",
              }}
              onClick={() => window.open(`http://${stores.website}`, "_self")}
            >
              <div style={{ style: "10%" }}>
                <LanguageRoundedIcon
                  style={{
                    color: "rgb(101 101 100 / 1)",
                    transform: "rotate(180deg)",
                  }}
                />
              </div>

              <span
                style={{
                  width: "90%",
                  textAlign: "center",
                  fontFamily: "IRANSansMobile",
                  fontSize: 14,
                }}
              >
                {stores.website}
              </span>
            </div>
          ) : null}
          {stores.lat && stores.long && stores.lat != 0 && stores.long != 0 ? (
            <div
              style={{
                width: "85%",
                display: "flex",
                border: "1px solid #c3c3c3",
                borderRadius: 20,
                direction: "rtl",
                padding: 5,
                boxSizing: "border-box",
                alignItems: "center",
                margin: "10px 0px",
              }}
              onClick={() =>
                stores.lat && stores.long && stores.lat != 0 && stores.long != 0
                  ? setShowMap(true)
                  : null
              }
            >
              <div style={{ style: "10%" }}>
                <SubdirectoryArrowLeftRoundedIcon
                  style={{
                    color: "rgb(101 101 100 / 1)",
                    transform: "rotate(180deg)",
                  }}
                />
              </div>

              <span
                style={{
                  width: "90%",
                  textAlign: "center",
                  fontFamily: "IRANSansMobile",
                  fontSize: 14,
                }}
              >
                برو به محل فروشگاه
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <Map
        show={showMap}
        close={() => setShowMap(false)}
        long={stores.long}
        lat={stores.lat}
        name={stores.storeName}
        activityType={stores.activityType}
        near={props.near}
      />
    </>
  );
};

export default TopStore;
