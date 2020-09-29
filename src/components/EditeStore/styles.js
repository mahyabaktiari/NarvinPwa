import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eee",
    paddingTop: 70,
    paddingBottom: "14vh",
  },
  addStore: {
    display: "flex",
    width: "80%",
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    border: "1px solid #CD0448",
    borderRadius: 10,
    padding: 5,
    marginTop: 15,
  },
  img: {
    width: 100,
    height: 100,
    border: "1.5px solid #CD0448",
    borderRadius: "50%",
    marginBottom: 0,
    marginTop: 20,
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 70,
    paddingBottom: 40,
  },
});

export default styles;
