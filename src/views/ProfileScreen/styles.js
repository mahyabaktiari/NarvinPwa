import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#eee",
    fontFamily: "IRANSansMobile",
    direction: "rtl",
    paddingBottom: 70,
    paddingTop: 70,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: "20px 20px 0px 20px",
  },
  info: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: "20px 20px 0px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: 70,
    height: 70,
    border: "1.5px solid #CD0448",
    borderRadius: "50%",
    margin: 20,
    marginBottom: 0,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
  itemTxt: {
    margin: 5,
    paddingRight: 8,
    color: "#CD0448",
  },
  supportBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    margin: "20px 20px 0px 20px",
  },
  root: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    zIndex: "1000 !important",
    // opacity: "1 !important",
    // visibility: "visible !important",
  },
}));

export default styles;
