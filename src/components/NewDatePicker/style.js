import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  root: {
    "& .ihDCMR": {
      display: "none !important",
    },
    "& .jSbysT": {
      justifyContent: "center !important",
    },
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

export default styles;
