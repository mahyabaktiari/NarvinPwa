import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  btn: {
    backgroundColor: "#610c34",
    width: 150,
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0px",
    fontFamily: "IRANSansMobile",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "canter",
    fontWeight: 100,
    "&:focus": {
      outline: "none",
    },
  },
  disable: {
    backgroundColor: "gray",
    width: 150,
    marginTop: 20,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0px",
    fontFamily: "IRANSansMobile",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "canter",
    fontWeight: 100,
  },
});

export default styles;
