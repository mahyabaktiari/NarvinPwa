import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
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
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  if (jm > 6) {
    if (jd + 7 > 30) {
      jd = jd + 7 - 30;
      jm = jm + 2;
    } else {
      jm = jm + 1;
      jd = jd + 7;
    }
  } else {
    if (jd + 7 > 31) {
      jd = jd + 7 - 31;
      jm = jm + 2;
    } else {
      jm = jm + 1;
      jd = jd + 7;
    }
  }
  return [jy, jm, jd];
}
var currentDate = gregorian_to_jalali(
  new Date().getFullYear() + 3,
  new Date().getMonth(),
  new Date().getDay() + 13
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
var hours = [
  {
    text: "00",
    value: "00",
  },
  {
    text: "01",
    value: "01",
  },
  {
    text: "02",
    value: "02",
  },
  {
    text: "03",
    value: "03",
  },
  {
    text: "04",
    value: "04",
  },
  {
    text: "05",
    value: "05",
  },
  {
    text: "06",
    value: "06",
  },
  {
    text: "07",
    value: "07",
  },
  {
    text: "08",
    value: "08",
  },
  {
    text: "09",
    value: "09",
  },
  {
    text: "10",
    value: "10",
  },
  {
    text: "11",
    value: "11",
  },
  {
    text: "12",
    value: "12",
  },
  {
    text: "13",
    value: "13",
  },
  {
    text: "14",
    value: "14",
  },
  {
    text: "15",
    value: "15",
  },
  {
    text: "16",
    value: "16",
  },
  {
    text: "17",
    value: "17",
  },
  {
    text: "18",
    value: "18",
  },
  {
    text: "19",
    value: "19",
  },
  {
    text: "20",
    value: "20",
  },
  {
    text: "21",
    value: "21",
  },

  {
    text: "22",
    value: "22",
  },
  {
    text: "23",
    value: "23",
  },
];

var min = [
  {
    text: "00",
    value: "00",
  },
  {
    text: "01",
    value: "01",
  },
  {
    text: "02",
    value: "02",
  },
  {
    text: "03",
    value: "03",
  },
  {
    text: "04",
    value: "04",
  },
  {
    text: "05",
    value: "05",
  },
  {
    text: "06",
    value: "06",
  },
  {
    text: "07",
    value: "07",
  },
  {
    text: "08",
    value: "08",
  },
  {
    text: "09",
    value: "09",
  },
  {
    text: "10",
    value: "10",
  },
  {
    text: "11",
    value: "11",
  },
  {
    text: "12",
    value: "12",
  },
  {
    text: "13",
    value: "13",
  },
  {
    text: "14",
    value: "14",
  },
  {
    text: "15",
    value: "15",
  },
  {
    text: "16",
    value: "16",
  },
  {
    text: "17",
    value: "17",
  },
  {
    text: "18",
    value: "18",
  },
  {
    text: "19",
    value: "19",
  },
  {
    text: "20",
    value: "20",
  },
  {
    text: "21",
    value: "21",
  },

  {
    text: "22",
    value: "22",
  },
  {
    text: "23",
    value: "23",
  },
  {
    text: "24",
    value: "24",
  },
  {
    text: "25",
    value: "25",
  },
  {
    text: "26",
    value: "26",
  },
  {
    text: "27",
    value: "27",
  },
  {
    text: "28",
    value: "28",
  },
  {
    text: "29",
    value: "29",
  },
  {
    text: "30",
    value: "30",
  },

  {
    text: "31",
    value: "31",
  },
  {
    text: "32",
    value: "32",
  },
  {
    text: "33",
    value: "33",
  },
  {
    text: "34",
    value: "34",
  },
  {
    text: "35",
    value: "35",
  },
  {
    text: "36",
    value: "36",
  },
  {
    text: "37",
    value: "37",
  },
  {
    text: "38",
    value: "38",
  },
  {
    text: "39",
    value: "39",
  },
  {
    text: "40",
    value: "40",
  },
  {
    text: "41",
    value: "41",
  },

  {
    text: "42",
    value: "42",
  },
  {
    text: "43",
    value: "43",
  },
  {
    text: "44",
    value: "44",
  },
  {
    text: "45",
    value: "45",
  },
  {
    text: "46",
    value: "46",
  },
  {
    text: "47",
    value: "47",
  },
  {
    text: "48",
    value: "48",
  },
  {
    text: "49",
    value: "49",
  },
  {
    text: "50",
    value: "50",
  },

  {
    text: "51",
    value: "51",
  },
  {
    text: "52",
    value: "52",
  },
  {
    text: "53",
    value: "53",
  },
  {
    text: "54",
    value: "54",
  },
  {
    text: "55",
    value: "55",
  },
  {
    text: "56",
    value: "56",
  },
  {
    text: "57",
    value: "57",
  },

  {
    text: "58",
    value: "58",
  },
  {
    text: "59",
    value: "59",
  },
];

var years = setYears(currentDate);

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

const TimePicker = (props) => {
  // this.state = {
  //   time: new Date(),
  //   isOpen: false,
  //   btnBirthDate: "تاریخ تولد",
  // };
  const [time, setTime] = useState(props.selectedDate);
  const dispatch = useDateDispatch();

  const showDatePicker = () => {
    var picker1 = new WheelPicker({
      el: "#birthDate",
      title: props.text,
      data: [hours, min],
      value: [
        currentDate[0],
        parseInt(currentDate[1]) < 10 ? "0" + currentDate[1] : currentDate[1],
      ],
      onChange: function (a, b) {
        console.log(a, b);
      },
      onSelect: function (selected) {
        console.log(selected[0].text + ":" + selected[1].value);
        // var input = document.getElementById("btnBirthDate");
        // input.innerHTML =
        //   selected[0].text + "/" + selected[1].value + "/" + selected[2].text;
        setTime(selected[0].text + ":" + selected[1].value);
        dispatch({
          type: "TIME_SELECTED",
          time: selected[0].text + ":" + selected[1].value,
        });

        currentDate = [];
        currentDate.push(parseInt(selected[0].text));
        if (parseInt(selected[1].value) < 10) {
          currentDate.push(parseInt(selected[1].value));
        } else {
          currentDate.push(selected[1].value);
        }
      },
    });
    picker1.show();
  };

  return (
    <Input
      label={props.text}
      value={time}
      defaultValue={props.selectedDate}
      focus={() => {
        showDatePicker();
      }}
      blur={() => {
        props.click();
      }}
      readOnly={true}
    />
  );
};

export default TimePicker;
