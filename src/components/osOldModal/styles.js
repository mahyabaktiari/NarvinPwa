import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "#CD0448",
    fontSize: "0.8rem",
    fontFamily: "IRANSansMobile",
    fontWeight: 500,
    margin: 0,
    direction: "rtl",
  },
  boxbtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "20%",
  },
  dwnlBtn: {
    borderRadius: 4,
    backgroundColor: "#610c34",
    padding: "6px 45px",
    color: "#fff",
    fontFamily: "IRANSansMobile",
    fontWeight: 100,
    fontSize: "0.8rem",
  },
});
export default styles;
