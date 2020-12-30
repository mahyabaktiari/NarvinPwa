import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import RecieptTrans from "../../components/Reciept/RecieptTrans/RecieptTrans";
import Modal from "react-modal";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { moneySplitter, fillZeroMerchId } from "../../util/validators";
import domtoimage from "dom-to-image";
import SaveIcon from "@material-ui/icons/Save";
const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 0,
    border: "none",
    borderRadius: 0,
    zIndex: 1000,
  },
};

const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    direction: "rtl",
    fontFamily: "IRANSansMobile",
    fontSize: "0.75rem",
    borderBottom: "0.5px solid gray",
    color: "#610c34",
    width: "100%",
    paddingRight: 10,
    paddingLeft: 5,
    boxSizing: "border-box",
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});

const BoxTrans = ({ trans }) => {
  const classes = useStyle();
  const recieptRef = useRef();

  useEffect(() => {
    Modal.setAppElement("body");
  });
  console.log(trans);
  const [openModal, setRecieptModal] = useState(false);
  console.log("setRecieptModal", openModal);

  const shareReciept = () => {
    domtoimage
      .toJpeg(recieptRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        console.log(link.href);
        function b64toBlob(dataURI) {
          var byteString = atob(dataURI.split(",")[1]);
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);

          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: "image/jpeg" });
        }
        /// link.click();
        console.log(b64toBlob(dataUrl));
        let blob = b64toBlob(dataUrl);
        const file = new File([blob], "fileName.jpg", {
          type: blob.type,
        });
        console.log(file);

        // const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        //   const byteCharacters = atob(b64Data);
        //   const byteArrays = [];

        //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        //     const slice = byteCharacters.slice(offset, offset + sliceSize);

        //     const byteNumbers = new Array(slice.length);
        //     for (let i = 0; i < slice.length; i++) {
        //       byteNumbers[i] = slice.charCodeAt(i);
        //     }

        //     const byteArray = new Uint8Array(byteNumbers);
        //     byteArrays.push(byteArray);
        //   }

        //   const blob = new Blob(byteArrays, {type: contentType});
        //   return blob;
        // }

        if (navigator.share !== undefined) {
          navigator
            .share({
              text: "رسید تراکنش",
              files: [file],
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch(console.error);
        } else {
          // fallback
        }
        console.log(recieptRef.current);
      });
  };
  return (
    <div style={{ width: "100%" }}>
      <div className={classes.container} onClick={() => setRecieptModal(true)}>
        <p style={{ width: "30%", textAlign: "right" }}>{trans.description}</p>
        <p style={{ width: "50%", textAlign: "center" }}>
          {" "}
          {trans.creationJalaliDateTime}
        </p>
        <div
          style={{
            width: "20%",
            textAlign: "left",
            color: trans.withdrawal ? "red" : "green",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <span style={{ paddingTop: 5 }}>
            {moneySplitter(trans.deposit ? trans.deposit : trans.withdrawal)}
          </span>
          {trans.deposit || (!trans.deposit && !trans.withdrawal) ? (
            <AddRoundedIcon />
          ) : (
            <RemoveRoundedIcon />
          )}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setRecieptModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={classes.myoverlay}
      >
        <div style={{ position: "relative", height: "100%" }} ref={recieptRef}>
          <RecieptTrans trans={trans} close={() => setRecieptModal(false)} />

          <div
            style={{
              position: "absolute",
              top: "90vh",
              borderRadius: 10,
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "7.5%",
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
              }}
              onClick={() => setRecieptModal(false)}
            >
              <span>بستن</span>
            </div>
            <div
              style={{
                backgroundColor: "lime",
                padding: 10,
                color: "#fff",
                fontSize: "0.9rem",
                fontFamily: "IRANSansMobile",
                width: "40%",
                borderRadius: 8,
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => shareReciept()}
            >
              <ShareOutlinedIcon style={{ color: "white" }} />
              <span>اشتراک گذاری</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BoxTrans;
