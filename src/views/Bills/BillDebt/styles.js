import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 300,
    width: "max-content",
    margin: "5px 5px 30px",
  },
  img: {
    width: 70,
  },
  addGH: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "IRANSansMobile",
    color: "#CD0448",
    fontWeight: 400,
    width: "80%",
    marginLeft: "10%",
    border: "1px solid #CD0448",
    borderRadius: 10,
    padding: "10px 0px",
    marginTop: 20,
  },
  containerWater: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imgWater: {
    width: 80,
    border: "1px solid gray",
    borderRadius: "50%",
    marginTop: 50,
  },
});

export default styles;
