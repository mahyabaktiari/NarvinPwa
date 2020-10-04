import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  balance: {
    width: "80%",
    marginLeft: "10%",
    color: "#CD0448",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    border: "1px solid #CD0448",
    fontFamily: "IRANSansMobile",
    paddingTop: 8,
    paddingBottom: 8,
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
