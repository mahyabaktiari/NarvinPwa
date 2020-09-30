import { makeStyles } from "@material-ui/core/styles";

const CssTextField = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    width: "70%",
    "& label.Mui-focused": {
      color: "#CD0448",
      textAlign: "right",
      fontFamily: "IRANSansMobile",
      fontSize: 11,
      top: -5,
    },
    "& label.MuiFormLabel-filled ": {
      textAlign: "right",
      fontFamily: "IRANSansMobile",
      fontSize: 11,
      top: -5,
    },
    "& .MuiInputLabel-formControl": {
      transform: "none",
      top: 20,
      right: 12,
      fontSize: 14,
      fontFamily: "IRANSansMobile",
      zIndex: 0,
    },
    "& .MuiFormControl-root": {
      direction: "ltr",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#CD0448",
    },
    "& .MuiInputBase-input": {
      fontFamily: "IRANSansMobile",
      height: 15,
      fontSize: 14,
      zIndex: 0,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
        zIndex: 0,
        "& legend": {
          textAlign: "right",
        },
      },
      "&:hover fieldset": {
        borderColor: "#CD0448",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#CD0448",
      },
    },
    "& .MuiSelect-iconOutlined": {
      left: 0,
      right: "90%",
    },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: 14,
    },
  },
}));

export default CssTextField;
