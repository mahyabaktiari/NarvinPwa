import React, { useEffect, useState } from "react";
import Map from "../Map/MaPComponent";
import { useMapDispatch, useMapState } from "../../context/mapContext";

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
        }}
        onClick={() =>
          stores.lat && stores.long && stores.lat != 0 && stores.long != 0
            ? setShowMap(true)
            : null
        }
      >
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
