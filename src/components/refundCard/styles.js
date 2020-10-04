import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
  input: {
    height: 40,
    width: "70%",
    border: "1px solid #CD0448",
    textAlign: "center",
    fontFamily: "IRANSansMobile",

    borderRadius: 4,
    "&:focus": {
      outline: "none",
    },
  },
});

export default styles;
