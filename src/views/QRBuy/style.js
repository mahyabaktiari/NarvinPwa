import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  root: {
    position: "absolute",
    top: -16,
    bottom: 70,
    zIndex: 0,
    "& section": {
      //  height: "60%",
      height: "43%",
      overflow: "hidden !important",
      position: "relative",

      "& div": {
        boxShadow: "rgba(255, 0, 0, 0.5) 0px 0px 0px 0px inset !important",
        border: "50px solid rgba(0, 0, 0, 0.4) !important",
        borderTop: "100px solid rgba(0, 0, 0, 0.4) !important",
        borderBottom: "200px solid rgba(0, 0, 0, 0.4) !important",
      },
    },
  },
  input: {
    borderRadius: 5,
    border: "1px solid #CD0448",
    height: 50,
    width: "70%",
    marginTop: 10,
    padding: 10,
    boxSizing: "border-box",
    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    borderRadius: 5,
    border: "1px solid #CD0448",
    height: 100,
    width: "70%",
    marginTop: 20,
    textAlign: "right",
    padding: 10,
    boxSizing: "border-box",
    fontFamily: "IRANSansMobile",
    "&:focus": {
      outline: "none",
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
