import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 300,
    width: "max-content",
    margin: "5px 5px 30px",
  },
  itemDisable: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 300,
    width: "max-content",
    margin: "5px 5px 30px",
    opacity: 0.3,
  },
  img: {
    width: 60,
  },
  addGH: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 400,
    width: "80%",
    marginLeft: "10%",
    border: "1px solid #CD0448",
    borderRadius: 10,
    padding: "5px 0px",
    marginTop: 20,
  },
  containerWater: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
  },
  imgWater: {
    width: 80,
    border: "1px solid gray",
    borderRadius: "50%",
    marginTop: 50,
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
