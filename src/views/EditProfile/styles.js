import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 70,
    direction: "rtl",
  },
  img: {
    width: 80,
    height: 80,
    border: "1.5px solid #CD0448",
    borderRadius: "50%",
    margin: 10,
    marginBottom: 0,
  },
  phone: {
    display: "flex",
    backgroundColor: "#eee",
    borderRadius: 30,
    padding: "10px 20px",
    alignItems: "center",
    marginTop: 20,
  },
  phoneTxt: {
    margin: 0,
    color: "#CD0448",
    paddingRight: 10,
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  containerModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    direction: "rtl",
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
  rootSuccsess: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "green",
      justifyContent: "center",
      fontFamily: "IRANSansMobile",
      flexGrow: 0,
      marginBottom: "10%",
      direction: "rtl",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    zIndex: "1000 !important",
    // opacity: "1 !important",
    // visibility: "visible !important",
  },
  btn: {
    backgroundColor: "#fff",
    border: "none",
    padding: 0,
    "&:focus": {
      outline: "none",
    },
  },
}));

export default styles;
