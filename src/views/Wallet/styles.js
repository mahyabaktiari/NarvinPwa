import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "80vh",
    backgroundColor: "#eee",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 300,
    paddingTop: 90,
  },
  balance: {
    width: 150,
    padding: 10,
    textAlign: "center",
    color: "#fff",
    borderRadius: 20,
    backgroundColor: "#610c34",
    direction: "rtl",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 200,
    border: "1px solid #CD0448",
    borderRadius: 3,
    "&:focus": {
      outline: "none",
    },
  },
  submit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    color: "#fff",
    padding: 10,
    width: 150,
    marginTop: 40,
    borderRadius: 10,
  },
  submit2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#610c34",
    color: "#fff",
    padding: 10,
    width: 150,
    marginTop: 40,
    borderRadius: 10,
  },
  root: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "red",
      justifyContent: "center",
      fontFamily: "IRANSansMobile",
      flexGrow: 0,
      marginBottom: "10%",
      direction: "rtl",
    },
  },
});
export default styles;
