import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 80,
  },
  img: {
    width: 80,
    height: 80,
    border: "1.5px solid #CD0448",
    borderRadius: "50%",
    margin: 10,
    marginBottom: 0,
  },
  phone: {
    display: "flex",
    backgroundColor: "#eee",
    borderRadius: 30,
    padding: "10px 20px",
    alignItems: "center",
    marginTop: 20,
  },
  phoneTxt: {
    margin: 0,
    color: "#CD0448",
    paddingRight: 10,
  },
});

export default styles;
