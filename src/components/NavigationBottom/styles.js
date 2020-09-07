import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  navigationBottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "gray",
  },
  navigationTxt: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "IRANSansMobile",
  },
  navigation: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    borderTop: "1px solid gray",
    paddingTop: 5,
    backgroundColor: "#fff",
    zIndex: 1000000,
  },
});

export default useStyle;
