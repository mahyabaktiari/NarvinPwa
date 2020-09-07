import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    fontFamily: "IRANSansMobile",
    direction: "rtl",
  },
  input: {
    height: 45,
    width: "70%",
    border: "1px solid gray",
    borderRadius: 5,
    fontFamily: "IRANSansMobile",
    backgroundColor: "#f5f5f5",
    marginTop: 12,
    padding: 10,
    boxSizing: "border-box",
  },
});

export default styles;
