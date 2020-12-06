import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  headingMask: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
    boxSizing: "border-box",
    fontFamily: "IRANSansMobile",
    //    width: wp(100),
    // borderRadius: 10,
    backgroundColor: "#f36",
    color: "#fff",
    overflowX: "hidden",
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
