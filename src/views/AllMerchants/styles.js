import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: "12vh",
  },
  btn: {
    backgroundColor: "#610c34",
    width: "60%",
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: 0,
    fontFamily: "IRANSansMobile",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "canter",
    fontWeight: 100,
    marginBottom: 10,
  },
  store: {
    display: "flex",
    border: "1px solid gray",
    width: "96%",
    borderRadius: 15,
    marginTop: 10,
  },
  logo: {
    width: "30%",
  },
  info: {
    width: "80%",
    fontFamily: "IRANSansMobile",
    fontWeight: 400,
    textAlign: "right",
    padding: "10px 10px",
    fontSize: 15,
  },
});

export default styles;
