import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  myoverlay: {
    position: "fixed",
    top: 0,
    left: -1,
    right: -1,
    bottom: 0,
    zIndex: 10000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});
export default styles;
