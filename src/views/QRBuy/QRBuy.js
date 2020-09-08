import React, { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBottm from "../../components/NavigationBottom/NavigationBottom";
import BarcodeReader from "react-qr-scanner";

const QRBuy = () => {
  const [result, setResult] = useState("no result");
  const handleScan = (data) => {
    setResult(data);
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <React.Fragment>
      <div style={{ paddingTop: 70 }}>
        <Header text="بارکد" />
        <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          style={{ height: 200 }}
        />
        <p>{result}</p>
        <NavigationBottm item="QRBuy" />
      </div>
    </React.Fragment>
  );
};

export default QRBuy;
