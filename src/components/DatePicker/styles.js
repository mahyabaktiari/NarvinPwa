import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "IRANSansMobile",
  },
  img: {
    width: 250,
    marginTop: 50,
  },
  text: {
    marginTop: 1,
    direction: "rtl",
  },
  input: {
    marginTop: 5,
    direction: "ltr",
  },
  timer: {
    marginTop: 15,
  },
  sendAgain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  mobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  App: {
    direction: "rtl",
    textalign: "center",
    fontfamily: "IRANSansMobile",
  },
});

export default useStyle;
