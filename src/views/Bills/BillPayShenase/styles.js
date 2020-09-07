import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  scanBtn: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#610c34",
    color: "#fff",
    borderRadius: 20,
    fontFamily: "IRANSansMobile",
    marginTop: 20,
    width: 180,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 300,
  },
});

export default styles;
