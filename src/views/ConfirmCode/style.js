import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "IRANSansMobile",
  },
  img: {
    width: 80,
    height: 120,
    marginTop: 70,
  },
  text: {
    marginTop: 20,
    direction: "rtl",
  },
  input: {
    marginTop: 20,
  },
  timer: {
    marginTop: 20,
  },
  sendAgain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  mobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  root: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "red",
      justifyContent: "center",
      fontFamily: "IRANSansMobile",
      flexGrow: 0,
      marginBottom: "10%",
      direction: "rtl",
    },
  },
});

export default useStyle;
