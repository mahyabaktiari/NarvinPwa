import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useAppContext } from "../../context/appContext";
import { moneySplitter } from "../../util/validators";

const Slideshow = (props) => {
  let { details } = props;
  const { productGallery } = useAppContext();
  const defaulimg = [details.imageUrl];
  console.log(productGallery);
  console.log(details.specifications);
  const [specifications, setSpecifications] = useState("");
  console.log(specifications);
  useEffect(() => {
    let val = details.specifications.replace(/'/g, `"`);
    setSpecifications(details ? JSON.parse(val.toString()) : console.log("f"));
  }, [details]);

  return (
    <div className="slide-container">
      <Slide arrows={false} indicators={true} autoplay={false}>
        {productGallery
          ? productGallery.map((each, index) => (
              <img
                key={index}
                style={{ width: "50%", marginLeft: "25%" }}
                src={each}
              />
            ))
          : defaulimg.map((each, index) => {
              return <img key={index} style={{ width: "100%" }} src={each} />;
            })}
      </Slide>
      <div style={styles.container}>
        <div
          style={{
            width: "100%",
            backgroundColor: "#eee",
            display: "flex",
            flexDirection: "column",
            padding: "2%",
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              borderRadius: 5,
              direction: "rtl",
              padding: "2%",
              boxSizing: "border-box",
              fontSize: 14,
            }}
          >
            <span style={styles.txt}>برند: {details.name}</span>
            <span style={styles.txt}>مدل: {details.model}</span>
            <span style={styles.txt}>
              قیمت پایه: {moneySplitter(details.salePrice)} ریال
            </span>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#eee",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#CD0448",
              width: "100%",
              padding: "1%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "IRANSansMobile",
                color: "#fff",
                fontSize: 14,
              }}
            >
              مشخصات فنی
            </span>
          </div>

          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              direction: "rtl",
              padding: "2%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontFamily: "IRANSansMobile",
                direction: "rtl",
                fontSize: 14,
              }}
            >
              {details.specifications === "" || details.specifications == null
                ? ""
                : details.specifications
                    .replace(/'/g, " ")
                    .replace(/[{}]/g, " ")}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#CD0448",
              width: "100%",
              padding: "1%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "IRANSansMobile",
                color: "#fff",
              }}
            >
              ویژگی های محصول
            </span>
          </div>
          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              direction: "rtl",
              padding: "2%",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                fontFamily: "IRANSansMobile",
                direction: "rtl",
                fontSize: 14,
              }}
            >
              {details.feature === "" || details.feature == null
                ? ""
                : details.feature.replace(/'/g, " ").replace(/[{}]/g, " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: "5%",
  },
  txt: {
    fontFamily: "IRANSansMobile",
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: "#9C4CD8",
    marginTop: "10%",
    width: "95%",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: "5%",
  },
  firstRow: {
    fontFamily: "IRANSansMobile",
    display: "flex",
    padding: "2%",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#eee",
  },

  detailHead: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#CD0448",
    alignSelf: "center",
    marginTop: "2%",
  },
  box: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderRadius: 5,
    boxSizing: "border-box",
  },
  descriptionCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderRadius: 5,
  },
};

export default Slideshow;
