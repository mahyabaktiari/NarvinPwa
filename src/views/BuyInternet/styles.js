import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#ddd",
    width: "60%",
    marginTop: 10,
    boxSizing: "border-box",
    padding: "5px 20px",
  },
  img: {
    width: 40,
    height: 40,
  },
  img2: {
    width: 40,
    height: 40,
    opacity: 0.5,
  },
});

export default styles;
