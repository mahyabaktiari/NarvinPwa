import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  input: {
    borderRadius: 5,
    border: "1px solid #CD0448",
    height: 50,
    width: "100%",
    marginTop: 10,
    padding: 10,
    boxSizing: "border-box",
    "&:focus": {
      outline: "none",
    },
  },
});

export default styles;
