import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
  },
  img: {
    width: 80,
    height: 120,
    marginTop: 40,
  },
  text: {
    marginTop: 30,
  },
  floatingLabelFocusStyle: {
    color: "red !important",
  },
  enter: {
    border: "1px solid #CD0448",
    borderRadius: 50,
    padding: "10px  40px",
    marginTop: 40,
    color: "#CD0448",
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: "#610c34",
    width: 150,
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    height: 50,
    fontFamily: "IRANSansMobile",
    fontSize: 18,
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorPhone: {
    color: "#CD0448",
    fontSize: 13,
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
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
  osOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

export default styles;
