import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
    paddingTop: 70,
    paddingBottom: "14vh",
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
      // width: "70% !important",
      // height: "70% !important",
    },
  },
  addStore: {
    display: "flex",
    width: "80%",
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    border: "1px solid #CD0448",
    borderRadius: 10,
    padding: 5,
    marginTop: 15,
  },
  img: {
    width: 100,
    height: 100,
    border: "1.5px solid #CD0448",
    borderRadius: "50%",
    marginBottom: 0,
    marginTop: 20,
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 50,
    paddingBottom: 40,
    direction: "rtl",
    width: "100%",
  },
  containerModal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    direction: "rtl",
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  btn: {
    backgroundColor: "#fff",
    border: "none",
    padding: 0,
    "&:focus": {
      outline: "none",
    },
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
