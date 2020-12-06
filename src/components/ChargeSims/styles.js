import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#ddd",
    width: "70%",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "5px 20px",
  },
  img: {
    width: "100%",
  },
  img2: {
    width: "100%",
    opacity: 0.5,
  },
  btn: {
    borderRadius: "50%",
    border: "none",
    padding: 0,
    width: "25%",
    height: "auto",
    fontSize: 0,
    "&:focus": {
      outline: "none",
    },
  },
});
export default styles;
