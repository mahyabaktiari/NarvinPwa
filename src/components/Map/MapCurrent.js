import React, { Component, useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import Modal from "react-modal";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationRoundedIcon from "@material-ui/icons/MyLocationRounded";
const mapboxgl = require("mapbox-gl");
mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
);
const styles = makeStyles({
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});
const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    borderRadius: 0,
    zIndex: 1000,
  },
};

const MarkerMap = ({ store }) => {
  const [showPupUp, setShowPupUp] = useState(false);
  return (
    <>
      <Marker
        latitude={Number(store.lat)}
        longitude={Number(store.long)}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img
          src={require("../../assets/icons/location.png")}
          style={{ width: 40 }}
          onClick={() => setShowPupUp(true)}
        />
      </Marker>
      {showPupUp ? (
        <Popup
          latitude={Number(store.lat)}
          longitude={Number(store.long)}
          onClose={() => setShowPupUp(false)}
        >
          <p
            style={{
              fontFamily: "IRANSansMobile",
              margin: 0,
              fontSize: 15,
            }}
          >
            {store.storeName}
          </p>
          <p
            style={{
              fontFamily: "IRANSansMobile",
              color: "gray",
              margin: 0,
              fontSize: 13,
              textAlign: "right",
            }}
          >
            {store.activityType}
          </p>
        </Popup>
      ) : null}
    </>
  );
};
const MapComponent = (props) => {
  const classes = styles();
  const [viewport, setViewport] = useState(false);

  console.log({
    width: "100vw",
    height: "100vh",
    latitude: Number(props.lat),
    longitude: Number(props.long),
    zoom: 15,
  });
  useEffect(() => {
    setViewport({
      width: "100vw",
      height: "100vh",
      latitude: Number(props.lat),
      longitude: Number(props.long),
      zoom: 15,
    });
  }, [props.show]);

  console.log(viewport);

  const geolocateStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  };
  const [showPup, setShowPup] = useState(false);
  const [showPupUp, setShowPupUp] = useState(false);
  return (
    <Modal
      isOpen={props.show}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName={classes.myoverlay}
    >
      <Header text="موقعیت پذیرنده در نقشه" click={props.close} />
      <ReactMapGL
        {...(viewport
          ? viewport
          : {
              width: "100vw",
              height: "100vh",
              latitude: 35.6892,
              longitude: 51.38897,
              // latitude: Number(props.lat),
              // longitude: Number(props.long),
              zoom: 15,
            })}
        onViewportChange={(nextViewport2) => setViewport(nextViewport2)}
        mapboxApiAccessToken="pk.eyJ1IjoibWFoeWExMjEyIiwiYSI6ImNraTczZ3lobzF4ejUyem56bmVsYm12eXcifQ.mwk6PutLycmg8U809_nPXA"
        mapStyle="mapbox://styles/mahya1212/ckimvtpd8395c17p9hm3yhc9y"
      >
        <MyLocationRoundedIcon
          onClick={() => {
            setViewport({
              width: "100vw",
              height: "100vh",
              latitude: Number(props.lat),
              longitude: Number(props.long),
              zoom: 15,
            });
          }}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            margin: 10,
            marginBottom: 32,
            width: 40,
            height: 40,
          }}
        />
        <Marker
          latitude={Number(props.lat)}
          longitude={Number(props.long)}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img
            src={require("../../assets/icons/current-location.png")}
            style={{ width: 40 }}
            onClick={() => setShowPupUp(true)}
          />
        </Marker>
        {/* <Marker
            latitude={35.700978}
            longitude={51.337462}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img
              src={require("../../assets/icons/location.png")}
              style={{ width: 40 }}
              onClick={() => setShowPup(true)}
            />
          </Marker>
          {showPup ? (
            <Popup
              latitude={Number(props.lat)}
              longitude={Number(props.long)}
              onClose={() => setShowPup(false)}
            >
              <p
                style={{
                  fontFamily: "IRANSansMobile",
                  margin: 0,
                  fontSize: 15,
                }}
              >
                {props.name}
              </p>
              <p
                style={{
                  fontFamily: "IRANSansMobile",
                  color: "gray",
                  margin: 0,
                  fontSize: 13,
                  textAlign: "right",
                }}
              >
                {props.activityType}
              </p>
            </Popup>
          ) : null} */}
        {props.stores.map((store) => {
          if (Number(store.lat) && Number(store.long)) {
            return <MarkerMap store={store} />;
          }
        })}
      </ReactMapGL>
      )
    </Modal>
  );
};

export default MapComponent;
