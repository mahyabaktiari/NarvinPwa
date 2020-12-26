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
    marginTop: 0,
    marginBottom: 5,
    fontFamily: "IRANSansMobile_Light",
    fontSize: 12,
  },
  navigation: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    borderTop: "1px solid gray",
    paddingTop: 5,
    boxSizing: "content-box",
    backgroundColor: "#fff",
    zIndex: 100,
    height: "8vh",
  },
});

export default useStyle;
