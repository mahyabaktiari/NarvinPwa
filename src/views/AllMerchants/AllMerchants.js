import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";

import axios from "axios";
import { Routes } from "../../api/api";
import TopStores from "../../components/TopStores/TopStores";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../../components/Input/input";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Location from "../../components/maplocation";
import Map from "../../components/Map/MapCurrent";
import Snackbar from "@material-ui/core/Snackbar";

const AllMerchants = (props) => {
  const classes = styles();
  const [Loading, setLoading] = useState(false);
  const [topStores, setTopStores] = useState([]);
  const [arrayList, setArrayList] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [nearLocation, setNearLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: "",
    long: "",
  });
  const [viewPort, setViewPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: "",
    longitude: "",
    zoom: 15,
  });
  const [back, setBack] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [textSnack, setTextSnack] = useState("enter your text !");
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    getTopStores(tokenStorage);
  }, []);

  useEffect(() => {
    UserLocation();
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

  useEffect(() => {
    if (arrayList) {
      let position = topStores.filter((store) => {
        return (
          store.lat && store.long && store.lat !== "0" && store.long !== "0"
        );
      });

      setNearLocation(position);
    }
  }, [arrayList]);

  const SearchFilterFunction = (e) => {
    let text = e.toLowerCase();
    let filteredName = arrayList.filter((item) => {
      return item.storeName.toLowerCase().match(text);
    });
    setTopStores(filteredName);
  };

  function getTopStores(token) {
    setLoading(true);
    axios
      .get(`${Routes.GetTopStores}`, { headers: { token: token } })
      .then((res) => {
        let status = res.data.responseCode;
        if (status === 200) {
          setLoading(false);
          let stores = res.data.value.response;
          setTopStores(stores);
          setArrayList(stores);
        } else {
          setLoading(false);
          setTextSnack(res.data.message);
          setSnackBar(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        setTextSnack(err.data.message);
        setSnackBar(true);
        // return Toast.show(res.data.message, {
        //   position: Toast.position.center,
        //   containerStyle: { backgroundColor: "red" },
        //   textStyle: { fontFamily: "IRANSansMobile" },
        // });
      });
  }

  const UserLocation = () => {
    axios
      .get(
        "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0"
      )
      .then(async (res) => {
        await setCurrentLocation({
          lat: res.data.latitude,
          long: res.data.longitude,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };
  return (
    <React.Fragment>
      <Header
        text="لیست فروشگاه های منتخب"
        click={() => props.history.push("/services")}
      />
      <Location />

      <div className={classes.container}>
        <div style={{ width: "96%", direction: "rtl", position: "relative" }}>
          <Input
            label="جستجو"
            change={(e) => SearchFilterFunction(e.target.value)}
            type="search"
          />
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "3%",
              color: "rgb(128 128 128)",
            }}
          >
            <SearchRoundedIcon />
          </div>
        </div>
        <div className={classes.btn} onClick={() => setShowMap(true)}>
          <p style={{ margin: 10 }}>مشاهده پذیرندگان در نقشه</p>
        </div>
        {topStores.length > 0 ? (
          nearLocation.length > 0 &&
          topStores.map((store, index) => {
            return <TopStores stores={store} key={index} near={nearLocation} />;
          })
        ) : (
          <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
        )}
      </div>
      <Map
        lat={currentLocation.lat}
        long={currentLocation.long}
        show={showMap}
        close={() => setShowMap(false)}
        stores={topStores}
      />
      <Snackbar
        open={snackBar}
        autoHideDuration={5000}
        message={textSnack}
        onClose={handleClose}
        className={classes.root}
      />
      {/* <Map /> */}
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default AllMerchants;
