import React, { Component, useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl } from "react-map-gl";
import Modal from "react-modal";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationRoundedIcon from "@material-ui/icons/MyLocationRounded";
import Submit from "../../components/SubmitButton/SubmitButton";
import { useMapDispatch } from "../../context/mapContext";
import "mapbox-gl/src/css/mapbox-gl.css";
// const mapboxgl = require("mapbox-gl");
// mapboxgl.setRTLTextPlugin(
//   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
// );
const styles = makeStyles({
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
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

const MapComponent = (props) => {
  const classes = styles();
  const [viewport, setViewport] = useState(false);
  const [drag, setDrag] = useState(false);
  console.log(drag);
  const dispatch = useMapDispatch();
  console.log({
    width: "100vw",
    height: "100vh",
    latitude: Number(props.lat),
    longitude: Number(props.long),
    zoom: 15,
  });
  useEffect(() => {
    props.coordinates.lat
      ? setViewport({
          width: "100vw",
          height: "100vh",
          latitude: Number(props.coordinates.lat),
          longitude: Number(props.coordinates.long),
          zoom: 15,
        })
      : setViewport({
          width: "100vw",
          height: "100vh",
          latitude: Number(props.lat),
          longitude: Number(props.long),
          zoom: 15,
        });
  }, [props.show]);

  const [showPup, setShowPup] = useState(true);
  const [showPupUp, setShowPupUp] = useState(false);
  console.log("coordinates", props.coordinates);
  console.log("lat", props.lat, "long", props.long);
  return (
    <Modal
      isOpen={props.show}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName={classes.myoverlay}
    >
      {props.coordinates.lat ? (
        <>
          <Header text="ثبت موقعیت جدید فروشگاه" click={props.close} />
          <ReactMapGL
            {...(viewport
              ? viewport
              : {
                  width: "100vw",
                  height: "100vh",
                  latitude: Number(props.coordinates.lat),
                  longitude: Number(props.coordinates.long),
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
                  latitude: Number(props.coordinates.lat),
                  longitude: Number(props.coordinates.long),
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
              latitude={
                drag ? viewport.latitude : Number(props.coordinates.lat)
              }
              longitude={
                drag ? viewport.longitude : Number(props.coordinates.long)
              }
              offsetLeft={-20}
              offsetTop={-10}
              onDrag={(e) => {
                setDrag(true);
                setViewport({
                  width: "100vw",
                  height: "100vh",
                  latitude: e.lngLat[1],
                  longitude: e.lngLat[0],
                  zoom: 15,
                });
              }}
              draggable
            >
              <img
                src={require("../../assets/icons/location.png")}
                style={{ width: 40 }}
                onClick={() => setShowPupUp(true)}
              />
            </Marker>
            {showPup && !drag ? (
              <Popup
                latitude={Number(props.coordinates.lat)}
                longitude={Number(props.coordinates.long)}
                onClose={() => setShowPup(false)}
              >
                <p
                  style={{
                    fontFamily: "IRANSansMobile",
                    margin: 0,
                    fontSize: 15,
                  }}
                >
                  موقعیت ثبت شده
                </p>
              </Popup>
            ) : null}
            <div
              style={{
                position: "absolute",
                left: "25%",
                bottom: 0,
                margin: 30,
                width: 40,
                height: 40,
              }}
            >
              <Submit
                text="ثبت موقعیت"
                click={() => {
                  dispatch({
                    type: "SET_POSITION",
                    coordinates: {
                      lat: viewport.latitude,
                      long: viewport.longitude,
                    },
                  });
                  props.close();
                }}
              />
            </div>
          </ReactMapGL>
        </>
      ) : (
        <>
          <Header text="ثبت موقعیت فروشگاه" click={props.close} />
          <ReactMapGL
            {...(viewport
              ? viewport
              : {
                  width: "100vw",
                  height: "100vh",
                  latitude: Number(props.lat),
                  longitude: Number(props.long),
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
              latitude={drag ? viewport.latitude : Number(props.lat)}
              longitude={drag ? viewport.longitude : Number(props.long)}
              offsetLeft={-20}
              offsetTop={-10}
              onDrag={(e) => {
                setDrag(true);
                setViewport({
                  width: "100vw",
                  height: "100vh",
                  latitude: e.lngLat[1],
                  longitude: e.lngLat[0],
                  zoom: 15,
                });
              }}
              draggable
            >
              <img
                src={require("../../assets/icons/location.png")}
                style={{ width: 40 }}
                onClick={() => setShowPupUp(true)}
              />
            </Marker>
            {showPup && !drag ? (
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
                  شما اینجا هستید
                </p>
              </Popup>
            ) : null}
            <div
              style={{
                position: "absolute",
                left: "25%",
                bottom: 0,
                margin: 30,
                width: 40,
                height: 40,
              }}
            >
              <Submit
                text="ثبت موقعیت"
                click={() => {
                  dispatch({
                    type: "SET_POSITION",
                    coordinates: {
                      lat: viewport.latitude,
                      long: viewport.longitude,
                    },
                  });
                  props.close();
                }}
              />
            </div>
          </ReactMapGL>{" "}
        </>
      )}
    </Modal>
  );
};

export default MapComponent;
