import React, { useState, useEffect } from "react";
import styles from "./styles";
import Submit from "../../../components/SubmitButton/SubmitButton";
import { isMobile } from "react-device-detect";
import Input from "../../../components/Input/input";
import axios from "axios";
import { Routes } from "../../../api/api";
import Modal from "react-modal";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import DateTime from "../../../components/DatePicker/DatePicker";
import {
  useDateDispatch,
  useDateState,
} from "../../../context/datePickerContex";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "html-react-parser";
import { parse, parseDefaults } from "himalaya";
import Header from "../../../components/Header/Header";
import BusInfo from "../../../components/BusInfo/BusInfo";
import Map from "../../../components/Map/MaPComponent";

const customStyles = {
  content: {
    width: "100%",
    height: "85vh",
    overflow: "hidden",
    bottom: 0,
    right: 0,
    left: 0,
    top: "auto",
    padding: 0,
    zIndex: 10000,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
};

const styleModal = {
  content: {
    width: "100%",
    overflow: "hidden",
    bottom: 0,
    right: 0,
    left: 0,
    top: "auto",
    padding: 0,
    zIndex: 10000,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
};
const styleModal2 = {
  content: {
    width: "100%",
    height: "100vh",
    overflow: "scroll",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    padding: 0,
    zIndex: 10000,
    border: "none",
  },
};

const Item = ({ item, click }) => (
  <button
    onClick={click}
    style={{
      width: "100%",
      backgroundColor: "#fff",
      fontFamily: "IRANSansMobile",
      padding: 10,
      border: "none",
      direction: "rtl",
      borderBottom: "0.8px solid gray",
    }}
  >
    {console.log(item)}
    {item.name}
  </button>
);
const BuyTicket = () => {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [cityList, setCityList] = useState(false);
  // const dispatch = useDateDispatch();
  // const { day, month, year } = useDateState();
  const [originTerminal, setOriginTerminal] = useState("");
  const [destinaton, setDestination] = useState(false);
  const [origin, setOrigin] = useState(false);
  const [destinationTerminal, setDestinationTerminal] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [arrayList, SetArryList] = useState([]);
  const [token, setToken] = useState("");
  const [movingTime, setMovingTime] = useState("");
  const [movingTimeNumber, setMovingTimeNumber] = useState("");
  const [movingDate, setMovingDate] = useState("");
  const [count, setCount] = useState(0);
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoServices, setInfoServices] = useState([]);
  const [showMovingTime, setShowMovingTime] = useState(false);
  console.log(terminals, "terminals");
  // console.log("sort", arryservis.sort(compareValues("discountPrice")));
  const arryservis = [];
  infoServices.map((service) => {
    arryservis.push({
      company: service[1].children[0].content,
      movingTime: service[5].children[0].content,
      typeBus: service[6].children[0].content,
      origin: service[7].children[0].content,
      srccityname: service[8].children[0].content,
      destination: service[9].children[0].content,
      descityid: service[10].children[0].content,
      seatsAvailable: service[11].children[0].content,
      discountPrice: service[12].children[0].content,
      price: service[13].children[0].content,
      finalDescityId: service[15].children[0].content,
      finalCity: service[16].children[0].content,
      numServis: service[3].children[0].content,
      tokenCompany: service[0].children[0].content,
    });
  });

  // window.addEventListener("load", function () {
  //   window.history.pushState({}, "");
  // });
  // window.addEventListener("popstate", function (event) {
  //   console.log(event.state);
  //   if (event.state) {
  //     console.log("ok");
  //     window.history.pushState({ noBackExitsApp: true }, "");
  //   }
  // });
  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
    Cities(tokenStorage);
  }, []);
  // const parse = require("html-react-parser");
  const classes = styles();
  const { date } = useDateState();
  console.log(date);
  const Cities = (token) => {
    console.log("citites");
    axios
      .get(`${Routes.GetCities}`, { headers: { token: token } })
      .then((res) => {
        let resCities = res.data.value.response;
        console.log(resCities);
        setTerminals(resCities);
        SetArryList(resCities);
        setLoading(false);
      })
      .catch((err) => {
        console.log("errpr", err);
        //   setLoading(false);
        // Toast.show('خطا در ارتباط با سرور', {
        //   position: Toast.position.center,
        //   containerStyle: {backgroundColor: 'red'},
        //   textStyle: {fontFamily: 'IRANSansMobile'},
        // });
      });
  };
  const selectTerminal = (terminal) => {
    if (origin) {
      setOriginTerminal(terminal.name);
      setOriginCode(terminal.id);
    }
    if (destinaton) {
      setDestinationTerminal(terminal.name);
      setDestinationCode(terminal.id);
    }
    // origin
    //   ? (setOriginTerminal(terminal.name), setOriginCode(terminal.id))
    //   : null;
    // destinaton
    //   ? (setDestinationTerminal(terminal.name), setDestinationCode(terminal.id))
    //   : null;
    setCityList(false);
    setOrigin(false);
    setDestination(false);
  };
  const SearchFilterFunction = (e) => {
    let text = e.toLowerCase();
    console.log(text);
    console.log(terminals);
    let filteredName = arrayList.filter((item) => {
      return item.name.toLowerCase().match(text);
    });
    console.log(filteredName);
    setTerminals(filteredName);
  };

  const GetListServis = async () => {
    console.log(
      originCode,
      destinationCode,
      movingDate,
      movingTimeNumber,
      count,
      token
    );

    let dateMove = date.replace("/", "");
    let dateMove2 = dateMove.replace("/", "");
    await axios
      .post(
        `${Routes.GetServisList}`,
        {
          sCityCode: originCode,
          dCityCode: destinationCode,
          reqDate: dateMove2,
          reqTime: movingTimeNumber,
        },
        {
          headers: { token: token },
        }
      )
      .then((res) => {
        console.log("res", JSON.parse(res.data.value.response).output);
        const outPut = JSON.parse(res.data.value.response).output;
        console.log(outPut);
        const json = parse(outPut, {
          ...parseDefaults,
          includePositions: true,
        });
        console.log(json);
        const servis = json[0].children;
        const Justservis = servis.filter((filter) => {
          return filter.type !== "text";
        });

        const infoServis = Justservis.map((servis) => {
          return servis.children.filter((filter) => {
            return filter.type !== "text";
          });
        });

        // const p = infoServis.map((item) => {
        //   return item.filter((filter) => {
        //     return filter.tagName === 'price';
        //   });
        // });

        console.log("aval", infoServis);
        setInfoServices(infoServis);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(
    "sort",
    arryservis ? arryservis.sort(compareValues("discountPrice")) : null
  );

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (a[key].length === b[key].length) {
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      } else {
        if (a[key].length > b[key].length) {
          console.log("sort", a[key], b[key]);
          comparison = 1;
        } else {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      }
    };
  }

  return (
    <>
      <div className={classes.container}>
        <span style={{ textAlign: "center" }}>
          لطفا برای خرید بلیت، اطلاعات زیر را وارد نمایید.
        </span>
        <Input
          label="مبدا"
          readOnly={true}
          value={originTerminal}
          click={() => {
            setLoading(true);
            // Cities();
            setCityList(true);
            setOrigin(true);
            setDestination(false);
          }}
        />
        <Input
          label="مقصد"
          readOnly={true}
          click={() => {
            setLoading(true);
            //  Cities();
            setCityList(true);
            setDestination(true);
            setOrigin(false);
          }}
          value={destinationTerminal}
        />
        {/* <Input label="تاریخ حرکت" readOnly={true} /> */}
        {<DateTime text="تاریخ حرکت" selectedDate={selectedDate} />}
        <Input
          label="زمان حرکت"
          readOnly={true}
          click={() => setShowMovingTime(true)}
          value={movingTime}
        />

        <Submit
          text="جستجو"
          disable={!destinationTerminal || !originTerminal || !date}
          click={() => {
            setSubmitButton(true);
            setLoading(true);
            GetListServis();
          }}
        />
      </div>
      <Modal
        isOpen={cityList}
        onRequestClose={() => {
          setCityList(false);
          setTerminals(arrayList);
        }}
        style={customStyles}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <KeyboardArrowDownRoundedIcon
            style={{ width: "15%", height: 35 }}
            onClick={() => {
              setCityList(false);
              setTerminals(arrayList);
            }}
          />
          <div style={{ width: "70%", textAlign: "right" }}>
            <Input
              label="نام شهر مورد نظر"
              change={(e) => SearchFilterFunction(e.target.value)}
            />
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "65vh",
                border: "1px solid gray",
                borderBottom: "none",
              }}
            >
              {terminals.map((terminal, index) => {
                return (
                  <Item
                    key={index}
                    item={terminal}
                    click={() => {
                      selectTerminal(terminal);
                      setTerminals(arrayList);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showMovingTime}
        onRequestClose={() => {
          setShowMovingTime(false);
        }}
        style={styleModal}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <KeyboardArrowDownRoundedIcon
            style={{ width: "15%", height: 35 }}
            onClick={() => {
              setShowMovingTime(false);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid gray",
              borderRadius: 10,
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            <button
              style={{
                padding: 10,
                width: "100%",
                border: "none",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottom: "1px solid gray",
                backgroundColor: "#fff",
                fontFamily: "IRANSansMobile",
                margin: 2,
              }}
              onClick={() => {
                setMovingTime("همه سرویس ها");
                setMovingTimeNumber(1);
                setShowMovingTime(false);
              }}
            >
              همه سرویس ها
            </button>
            <button
              style={{
                padding: 10,
                width: "100%",
                border: "none",
                borderBottom: "1px solid gray",
                backgroundColor: "#fff",
                fontFamily: "IRANSansMobile",
                margin: 2,
              }}
              onClick={() => {
                setMovingTime("صبح");
                setMovingTimeNumber(2);
                setShowMovingTime(false);
              }}
            >
              صبح
            </button>
            <button
              style={{
                padding: 10,
                width: "100%",
                border: "none",
                borderBottom: "1px solid gray",
                backgroundColor: "#fff",
                fontFamily: "IRANSansMobile",
                margin: 2,
              }}
              onClick={() => {
                setMovingTime("عصر");
                setMovingTimeNumber(3);
                setShowMovingTime(false);
              }}
            >
              عصر
            </button>
            <button
              style={{
                padding: 10,
                width: "100%",
                border: "none",
                backgroundColor: "#fff",
                fontFamily: "IRANSansMobile",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                margin: 2,
              }}
              onClick={() => {
                setMovingTime("شب");
                setMovingTimeNumber(4);
                setShowMovingTime(false);
              }}
            >
              شب
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={submitButton}
        onRequestClose={() => {
          setSubmitButton(false);
        }}
        style={styleModal2}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <Header text="انتخاب سفر" click={() => setSubmitButton(false)} />
        <div
          style={{
            paddingTop: 70,
            paddingBottom: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              width: "95%",
              borderRadius: 5,
              backgroundColor: "green",
              color: "#FFF",
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              boxSizing: "border-box",
              direction: "rtl",
              fontFamily: "IRANSansMobile",
              fontSize: 14,
            }}
          >
            <span>{`${originTerminal} به ${destinationTerminal}`} </span>
            <span>{date}</span>
          </div>
          {loading ? (
            <CircularProgress color="secondary" style={{ marginTop: "13%" }} />
          ) : infoServices.length === 0 ? (
            <span
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "gray",
                fontFamily: "IRANSansMobile",
                direction: "rtl",
                marginTop: "10%",
              }}
            >
              {" "}
              هیچ اتوبوسی در این مسیر وجود ندارد.
            </span>
          ) : (
            arryservis.map((service) => {
              return (
                <BusInfo
                  service={service}
                  originTerminal={originTerminal}
                  destinationTerminal={destinationTerminal}
                  token={token}
                  time={date}
                  originCode={originCode}
                  destinationCode={destinationCode}
                  closeTeravel={() => setSubmitButton(false)}
                  empty={() => {
                    setOriginTerminal("");
                    setDestinationTerminal("");
                    setSelectedDate("");
                    setMovingTime("");
                    setCount(0);
                  }}
                  dateMoment={date}
                />
              );
            })
          )}
        </div>
      </Modal>
    </>
  );
};

export default BuyTicket;
