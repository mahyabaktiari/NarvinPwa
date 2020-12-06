import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#ddd",
    width: "70%",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "5px 20px",
  },
  img: {
    width: "25%",
  },
  img2: {
    width: "25%",
    opacity: 0.5,
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
  btn: {
    width: "100%",
    padding: "2%",
    border: "none",
    backgroundColor: "#fff",
    fontSize: "0.8rem",
    "&:focus": {
      outline: "none",
    },
  },
  btnSubmit: {
    backgroundColor: "#610c34",
    width: 130,
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0px",
    fontFamily: "IRANSansMobile",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "canter",
    fontWeight: 100,
    "&:focus": {
      outline: "none",
    },
  },
  disable: {
    backgroundColor: "gray",
    width: 130,
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0px",
    fontFamily: "IRANSansMobile",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "canter",
    fontWeight: 100,
  },
});

export default styles;
