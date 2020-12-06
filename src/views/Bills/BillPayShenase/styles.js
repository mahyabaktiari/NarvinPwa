import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  scanBtn: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#610c34",
    color: "#fff",
    borderRadius: 20,
    fontFamily: "IRANSansMobile",
    marginTop: 20,
    width: 180,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 300,
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
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

export default styles;
