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
    width: "60%",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "5px 20px",
  },
  img: {
    width: 60,
    height: 60,
  },
  img2: {
    width: 60,
    height: 60,
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
});

export default styles;
