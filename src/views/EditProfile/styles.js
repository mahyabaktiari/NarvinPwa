import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "13vh",
    paddingTop: 70,
    direction: "rtl",
  },
  cropContainer: {
    marginTop: 57,
    position: "relative",
    width: "100%",
    height: "50vh",
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: "35vh",
    },
    "& .reactEasyCrop_CropArea": {
      // width: "290px !important",
      // height: "290px !important",
    },
  },
  img: {
    width: 120,
    height: 120,
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
    zIndex: 100,
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
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
}));

export default styles;
