import React, { Component, useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import Modal from "react-modal";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import Geolocation from "react-geolocation";

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
          onClick={setShowPupUp(true)}
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
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: Number(props.lat),
    longitude: Number(props.long),
    zoom: 15,
  });

  const [viewport2, setViewport2] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.700978,
    longitude: 51.337462,
    zoom: 15,
  });
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
      {props.type === "allmerchant" ? (
        <ReactMapGL
          {...viewport2}
          onViewportChange={(nextViewport2) => setViewport2(nextViewport2)}
          mapboxApiAccessToken="pk.eyJ1IjoibWFoeWExMjEyIiwiYSI6ImNraTczZ3lobzF4ejUyem56bmVsYm12eXcifQ.mwk6PutLycmg8U809_nPXA"
          mapStyle="mapbox://styles/mahya1212/cki74ebvq2bpl19qv7pg9bz03"
          onClick={() => setShowPup(false)}
          showUserLocation={true}
        >
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
      ) : (
        <ReactMapGL
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken="pk.eyJ1IjoibWFoeWExMjEyIiwiYSI6ImNraTczZ3lobzF4ejUyem56bmVsYm12eXcifQ.mwk6PutLycmg8U809_nPXA"
          mapStyle="mapbox://styles/mahya1212/cki74ebvq2bpl19qv7pg9bz03"
          onClick={() => setShowPup(false)}
          showUserLocation={true}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            onViewportChange={(e) => console.log(e)}
            showAccuracyCircle={true}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              margin: 10,
              marginBottom: 32,
            }}
          ></GeolocateControl>
          <Marker
            latitude={Number(props.lat)}
            longitude={Number(props.long)}
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
          ) : null}

          {props.near.map((store, index) => {
            const [showPupUp, setShowPupUp] = useState(false);
            if (
              Number(store.lat) !== Number(props.lat) &&
              Number(store.long) !== Number(props.long)
            )
              return (
                <>
                  <Marker
                    latitude={Number(store.lat)}
                    longitude={Number(store.long)}
                    offsetLeft={-20}
                    offsetTop={-10}
                    key={index}
                  >
                    <img
                      src={require("../../assets/icons/location2.png")}
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
          })}
        </ReactMapGL>
      )}
    </Modal>
  );
};

export default MapComponent;
