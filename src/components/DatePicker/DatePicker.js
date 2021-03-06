import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import classInput from "./styles";
import WheelPicker from "../wheelpicker/WheelPicker";
import { SettingsRemoteSharp } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { useDateDispatch, useDateState } from "../../context/datePickerContex";
import Input from "../../components/Input/input";

const monthMap = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};

function gregorian_to_jalali(gy, gm, gd) {
  var jy = gy,
    jm = gm,
    jd = gd;
  // var g_d_m, jy, jm, jd, gy2, days;
  // g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  // gy2 = gm > 2 ? gy + 1 : gy;
  // days =
  //   355666 +
  //   365 * gy +
  //   ~~((gy2 + 3) / 4) -
  //   ~~((gy2 + 99) / 100) +
  //   ~~((gy2 + 399) / 400) +
  //   gd +
  //   g_d_m[gm - 1];
  // jy = -1595 + 33 * ~~(days / 12053);
  // days %= 12053;
  // jy += 4 * ~~(days / 1461);
  // days %= 1461;
  // if (days > 365) {
  //   jy += ~~((days - 1) / 365);
  //   days = (days - 1) % 365;
  // }
  // if (days < 186) {
  //   jm = 1 + ~~(days / 31);
  //   jd = 1 + (days % 31);
  // } else {
  //   jm = 7 + ~~((days - 186) / 30);
  //   jd = 1 + ((days - 186) % 30);
  // }

  // if (jm > 6) {
  //   if (jd + 7 > 30) {
  //     jd = jd + 7 - 30;
  //     jm = jm + 2;
  //   } else {
  //     jm = jm + 1;
  //     jd = jd + 7;
  //   }
  // } else {
  //   if (jd + 7 > 31) {
  //     jd = jd + 7 - 31;
  //     jm = jm + 2;
  //   } else {
  //     jm = jm + 1;
  //     jd = jd + 7;
  //   }
  // }
  return [jy, jm, jd];
}

var currentDate = gregorian_to_jalali(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDay()
);
const dateConfig = {
  year: {
    format: "YYYY",
    caption: "سال",
    step: 1,
  },
  month: {
    format: (value) => monthMap[value.getMonth() + 1],
    caption: "ماه",
    step: 1,
  },
  date: {
    format: "DD",
    caption: "روز",
    step: 1,
  },
};
var days = setDays(currentDate[1]);
var months = [
  {
    text: "فروردین",
    value: "01",
  },
  {
    text: "اردیبهشت",
    value: "02",
  },
  {
    text: "خرداد",
    value: "03",
  },
  {
    text: "تیر",
    value: "04",
  },
  {
    text: "مرداد",
    value: "05",
  },
  {
    text: "شهریور",
    value: "06",
  },
  {
    text: "مهر",
    value: "07",
  },
  {
    text: "آبان",
    value: "08",
  },
  {
    text: "آذر",
    value: "09",
  },
  {
    text: "دی",
    value: "10",
  },
  {
    text: "بهمن",
    value: "11",
  },
  {
    text: "اسفند",
    value: "12",
  },
];
var years = setYears(currentDate);
var years = [
  "1394",
  "1395",
  "1396",
  "1397",
  "1398",
  "1399",
  "1400",
  "1401",
  "1402",
];

function setYears(_Date) {
  var i = 100;
  var a = [];
  for (i = 100; i >= 0; i--) {
    a.push(parseInt(currentDate) - i);
  }
  return a;
}

function setDays(_month) {
  var x = _month > 6 ? 30 : 31;
  var a = [];
  var i = 1;
  for (i = 1; i <= x; i++) {
    a.push(parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i));
  }
  return a;
}

const DateTime = (props) => {
  // this.state = {
  //   time: new Date(),
  //   isOpen: false,
  //   btnBirthDate: "تاریخ تولد",
  // };
  const [date, setBirthDate] = useState(props.selectedDate);
  const dispatch = useDateDispatch();
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
  const showDatePicker = () => {
    var picker1 = new WheelPicker({
      el: "#birthDate",
      title: props.text,
      data: [years, months, days],
      value: [
        Number(m[0]),
        Number(m[1]) < 10 ? "0" + Number(m[1]) : Number(m[1]),
        Number(m[2]) < 10 ? "0" + Number(m[2]) : Number(m[2]),
      ],
      onChange: function (a, b) {
        if (a == 1) {
          var m = parseInt(b.value.replace(/^0+/, ""));
          days = setDays(m);
          this.setData(days, 2);
        }
      },
      onSelect: function (selected) {
        // var input = document.getElementById("btnBirthDate");
        // input.innerHTML =
        //   selected[0].text + "/" + selected[1].value + "/" + selected[2].text;
        setBirthDate(
          selected[0].text + "/" + selected[1].value + "/" + selected[2].text
        );
        dispatch({
          type: "DATE_SELECTED",
          date:
            selected[0].text + "/" + selected[1].value + "/" + selected[2].text,
        });

        currentDate = [];
        currentDate.push(parseInt(selected[0].text));
        if (parseInt(selected[1].value) < 10) {
          currentDate.push(parseInt(selected[1].value));
        } else {
          currentDate.push(selected[1].value);
        }
        currentDate.push(parseInt(selected[2].text));
      },
    });
    picker1.show();
  };

  return (
    <Input
      label={props.text}
      value={date}
      defaultValue={props.selectedDate}
      focus={() => {
        showDatePicker();
      }}
      blur={() => (props.click ? props.click() : null)}
      readOnly={true}
    />
  );
};

export default DateTime;
