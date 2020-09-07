import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  store: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#a01355",
    borderRadius: 10,
    marginTop: 20,
    color: "#fff",
    padding: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  info: {
    textAlign: "right",
    fontFamily: "IRANSansMobile",
    width: "100%",
    padding: 3,
    fontWeight: 300,
  },
  txt: {
    margin: 5,
    fontSize: 14,
  },
  iconBox: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    color: "#a01355",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "80%",
    marginLeft: "10%",
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 300,
  },
});

export default styles;
