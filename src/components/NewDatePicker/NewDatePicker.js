import React, { useEffect, useState } from "react";
import WheelPicker from "react-simple-wheel-picker";
import style from "./style";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Modal from "react-modal";
import Input from "../../components/Input/input";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import { days, months, years } from "./Constants";

const DatePicker = (props) => {
  const classes = style();
  const dispatch = useDateDispatch();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  useEffect(() => {
    let i =
      props.selectedDate &&
      props.selectedDate !== "0" &&
      props.selectedDate.split("/");
    if (i) {
      setSelectedDay(i[2]);
      setSelectedMonth(i[1]);
      let year = years.find((year) => {
        return year.value === i[0];
      });
      setSelectedYear(year.id);
    }
  }, [props.selectedDate]);

  const nextYear = [
    { id: "89", value: "1399" },
    { id: "90", value: "1400" },
  ];

  useEffect(() => {
    if (props.current) {
      setSelectedDay(m[2]);
      setSelectedMonth(m[1]);
      let year = nextYear.find((year) => {
        return year.value === m[0];
      });
      setSelectedYear(year.id);
    }
  }, []);

  let day = "";
  let month = "";
  let year = "";

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(props.selectedDate);
  const [currenDate] = React.useState(new Date());
  let t = currenDate.toLocaleDateString("fa");
  const convertToEn = (item) => {
    let en = item
      .replace(/۰/g, 0)
      .replace(/۱/g, 1)
      .replace(/۲/g, 2)
      .replace(/۳/g, 3)
      .replace(/۴/g, 4)
      .replace(/۵/g, 5)
      .replace(/۶/g, 6)
      .replace(/۷/g, 7)
      .replace(/۸/g, 8)
      .replace(/۹/g, 9);
    return en;
  };
  let m = convertToEn(t).split("/");
  const styleModal = {
    content: {
      width: "100%",
      overflow: "hidden",
      bottom: 0,
      right: 0,
      left: 0,
      top: "auto",
      padding: 0,
      zIndex: 1000000,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
  };
  return (
    <>
      <Input
        label={props.text}
        value={date === 0 ? "" : date}
        click={() => {
          setShowDatePicker(true);
        }}
        blur={() => (props.click ? props.click() : null)}
        readOnly={true}
      />
      <Modal
        isOpen={showDatePicker}
        onRequestClose={() => {
          setShowDatePicker(false);
        }}
        style={styleModal}
        overlayClassName={classes.myoverlay}
        contentLabel="Example Modal"
      >
        <div className={classes.root}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              direction: "rtl",
              marginBottom: 20,
              padding: 20,
              fontFamily: "IRANSansMobile",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "30%", textAlign: "center" }}>
              <CloseRoundedIcon
                style={{ color: "red" }}
                onClick={() => setShowDatePicker(false)}
              />
            </div>
            <span style={{ width: "35%", textAlign: "center" }}>
              انتخاب تاریخ
            </span>{" "}
            <div style={{ width: "30%" }}></div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              fontFamily: "IRANSansMobile_Light",
              direction: "rtl",
            }}
          >
            <WheelPicker
              data={days}
              onChange={(e) => {
                day = e;
              }}
              height={150}
              width={80}
              titleText="Enter value same as aria-label"
              itemHeight={30}
              selectedID={selectedDay ? selectedDay : days[0].id}
              color="#ccc"
              activeColor="#333"
              backgroundColor="#fff"
              shadowColor="false"
            />
            <WheelPicker
              data={months}
              onChange={(e) => {
                month = e;
              }}
              height={150}
              width={80}
              titleText="Enter value same as aria-label"
              itemHeight={30}
              selectedID={selectedMonth ? selectedMonth : months[0].id}
              color="#ccc"
              activeColor="#333"
              backgroundColor="#fff"
              shadowColor="false"
            />
            <WheelPicker
              data={props.current ? nextYear : years}
              onChange={(e) => {
                year = e;
              }}
              height={150}
              width={80}
              titleText="Enter value same as aria-label"
              itemHeight={30}
              selectedID={selectedYear ? selectedYear : years[0].id}
              color="#ccc"
              activeColor="#333"
              backgroundColor="#fff"
              shadowColor="false"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                backgroundColor: "#610c34",
                width: 110,
                margin: "20px 0px",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "5px 0px",
                fontFamily: "IRANSansMobile",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "canter",
                fontWeight: 100,
                "&:focus": {
                  outline: "none",
                },
              }}
              onClick={() => {
                dispatch({
                  type: "DATE_SELECTED",
                  date: year.value + "/" + month.id + "/" + day.id,
                });
                setDate(`${year.value}/${month.id}/${day.id}`);
                setShowDatePicker(false);
              }}
            >
              تایید
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DatePicker;
