import React, { useEffect, useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TextField from "@material-ui/core/TextField";
import useStyle from "../ReportStore/style";
import DateTime from "../../components/DatePicker/DatePicker";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import TimePicker from "../../components/TimePicker/timePicker";
import Submit from "../SubmitButton/SubmitButton";
import { Routes } from "../../api/api";
import Axios from "axios";

const ReportStore = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const { date, time } = useDateState();
  const [seletTime, setSelectTime] = useState("");
  const [selectTime2, setSelectTime2] = useState("");
  const [showTime, setShowTime] = useState();
  const [selectDate, setSelcetDate] = useState("");
  const [selectDate2, setSelectDate2] = useState("");
  const [showDate, setShowDate] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    setToken(tokenStorage);
  });
  useEffect(() => {
    console.log(showTime);
    if (showTime) {
      setSelectTime(time);
    } else {
      setSelectTime2(time);
    }

    if (showDate) {
      setSelcetDate(date);
    } else {
      setSelectDate2(date);
    }
  });
  const fetchReports = () => {
    console.log("chi?");
    Axios.post(
      `${Routes.GenerateOrderReport}`,
      {
        MerchantId: props.merchantId,
        FromDate: selectDate + " " + seletTime,
        ToDate: selectDate2 + " " + selectTime2,
      },
      { headers: { token: token } }
    )
      .then((res) => {
        console.log("ReS", res);
        let status = res.data.responseCode;
        if (status === 200) {
          //   setLoading(false);
          // setTotalSales(res.data.value.totalAmount);
          // setTotalCount(res.data.value.totalCount);
          // setReports(res.data.value.response);
          // reset();
        } else {
          //  setLoading(false);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //  setLoading(false);
        console.log("ERR", err.response);
        alert("خطا در بازیابی گزارش!");
      });
  };
  console.log(seletTime, selectTime2);
  console.log(selectDate, selectDate2);
  const classes = useStyle();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: 60,
        direction: "rtl",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <FilterListIcon
          style={{ color: "#CD0448", padding: 10 }}
          onClick={() => setShowFilter(!showFilter)}
        />
        <span style={{ color: "#610c34", fontFamily: "IRANSansMobile" }}>
          فیلتر تاریخ
        </span>
      </div>
      <div
        style={{
          display: !showFilter ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{ width: "55%", display: "flex", justifyContent: "center" }}
          >
            <DateTime
              text="بازه زمانی از تاریخ"
              selectedDate={date}
              click={() => setShowDate(true)}
            />
          </div>
          <div
            style={{ width: "25%", display: "flex", justifyContent: "center" }}
          >
            <TimePicker
              text="از ساعت"
              selectedDate={time}
              click={() => setShowTime(true)}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{ width: "55%", display: "flex", justifyContent: "center" }}
          >
            {/* <TextField
              label="بازه زمانی تا تاریخ"
              className={classes.root}
              id="custom-css-standard-input"
              variant="outlined"
            /> */}
            <DateTime
              text="بازه زمانی تا تاریخ"
              selectedDate={date}
              click={() => setShowDate(false)}
            />
          </div>
          <div
            style={{ width: "25%", display: "flex", justifyContent: "center" }}
          >
            <TimePicker
              text="تا ساعت"
              selectedDate={time}
              click={() => setShowTime(false)}
            />
          </div>
        </div>
        <Submit
          text="گزارش"
          disable={!selectDate || !selectDate2}
          click={() => fetchReports()}
        />
      </div>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#CD0448",
          color: "#fff",
          padding: 10,
          fontFamily: "IRANSansMobile",
          fontSize: 14,
        }}
      >
        <span>جمع کل فروش : 0 ریال</span>
        <span>تعداد : 0</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InfoOutlinedIcon
          size="large"
          style={{
            color: "#CD0448",
            opacity: "0.7",
            marginTop: 30,
            fontSize: 40,
          }}
        />
        <span
          style={{
            fontFamily: "IRANSansMobile",
            color: "#CD0448",
            opacity: 0.7,
            marginTop: 10,
          }}
        >
          در این بازه گزارشی یافت نشد!
        </span>
      </div>
    </div>
  );
};

export default ReportStore;
