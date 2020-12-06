import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import styles from "./styles";
import Map from "../../components/Map/map";
import axios from "axios";
import { Routes } from "../../api/api";
import TopStores from "../../components/TopStores/TopStores";
import CircularProgress from "@material-ui/core/CircularProgress";

const AllMerchants = (props) => {
  const classes = styles();
  const [Loading, setLoading] = useState(false);
  const [topStores, setTopStores] = useState([]);
  const [nearLocation, setNearLocation] = useState([]);
  console.log("nearLocation", nearLocation);
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    getTopStores(tokenStorage);
    navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log(res.coords.latitude);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  var backButtonPrevented = false;
  function popStateListener(event) {
    if (backButtonPrevented === false) {
      window.history.pushState(null, "gfgfg", window.location.href);
      console.log("Back Button Prevented");
      backButtonPrevented = true;
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  window.addEventListener("popstate", popStateListener);

  useEffect(() => {
    if (topStores) {
      let position = topStores.filter((store) => {
        return (
          store.lat && store.long && store.lat !== "0" && store.long !== "0"
        );
      });

      setNearLocation(position);
    }
  }, [topStores]);

  function getTopStores(token) {
    setLoading(true);
    axios
      .get(`${Routes.GetTopStores}`, { headers: { token: token } })
      .then((res) => {
        let status = res.data.responseCode;
        console.log(res);
        if (status === 200) {
          setLoading(false);
          let stores = res.data.value.response;
          setTopStores(stores);
        } else {
          setLoading(false);
          // return Toast.show(res.data.message, {
          //   position: Toast.position.center,
          //   containerStyle: { backgroundColor: "red" },
          //   textStyle: { fontFamily: "IRANSansMobile" },
          // });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
        // return Toast.show(res.data.message, {
        //   position: Toast.position.center,
        //   containerStyle: { backgroundColor: "red" },
        //   textStyle: { fontFamily: "IRANSansMobile" },
        // });
      });
  }
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
        {topStores.length > 0 ? (
          nearLocation.length > 0 &&
          topStores.map((store, index) => {
            return <TopStores stores={store} key={index} near={nearLocation} />;
          })
        ) : (
          <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
        )}
      </div>
      {/* <Map /> */}
      <NavigationBottom item="SERVISES" />
    </React.Fragment>
  );
};

export default AllMerchants;
