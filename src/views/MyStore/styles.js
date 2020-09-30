import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
    paddingTop: 70,
    height: "90vh",
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
    marginBottom: 10,
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 50,
    paddingBottom: 40,
    direction: "rtl",
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
    zIndex: 100,
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
});

export default styles;
