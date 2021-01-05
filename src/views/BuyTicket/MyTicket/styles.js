import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    height: "75vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    fontFamily: "IRANSansMobile",
    direction: "rtl",
    color: "#CD0448",
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
