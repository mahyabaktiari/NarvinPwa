import React, { Component } from "react";
import Mapir from "mapir-react-component";
import image from "../../assets/icons/location.png";
import Modal from "react-modal";
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
const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYxYmE0MDRhNmU5NzhjYjMxNGJkZTEyYTkwNDAzOWY3MjBiN2VhZTRlN2ZkZTJjNGExZGVlZDRjNDE5MmEzOTNiMmI1NDk0MTg1YzhiZDgwIn0.eyJhdWQiOiIxMTY5MSIsImp0aSI6IjYxYmE0MDRhNmU5NzhjYjMxNGJkZTEyYTkwNDAzOWY3MjBiN2VhZTRlN2ZkZTJjNGExZGVlZDRjNDE5MmEzOTNiMmI1NDk0MTg1YzhiZDgwIiwiaWF0IjoxNjA2ODEwNjMyLCJuYmYiOjE2MDY4MTA2MzIsImV4cCI6MTYwOTMxNjIzMiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.fPQxgL69Al5X-ctIzLUTMPBFDvgK-1_O3klffQocjdsTbb6R_y7uPmOP6cyHJieZMu2Qx7NXd49bonng-EEJ5IFHw6RMVhZloc9tApvJM6eB2tY5dZWWIBlqaRLe8mJ3lmOpXAs9XJqYNxp5VdAgoGh6hbQe0zO7uq0Nf83RZkL4jq0gpsD3MMhrgLfw7BwqzQVbpQQ7cBLYO1_kebHlSuk5AEOVdSs_WT-47CL9roD65Xe0Fw4VKyoGkGTwG1GVhnsEdlum4JnHvYSybyXwIcmp7VK4N3XFRoNFkulJQ9vNFicWPo8iPWbBd-iS39WuCkfuKl-1X9PAZWrimjhspw", //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});
export default class MapComponent extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.show}
        onRequestClose={this.props.close}
        style={customStyles}
        contentLabel="Example Modal"
        //  overlayClassName={classes.myoverlay}
      >
        <div className="App">
          <Mapir
            center={[this.props.long, this.props.lat]}
            minZoom={[19]}
            scrollZoom={false}
            hash={true}
            Map={Map}
            interactive={true}
            apiKey={
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYxYmE0MDRhNmU5NzhjYjMxNGJkZTEyYTkwNDAzOWY3MjBiN2VhZTRlN2ZkZTJjNGExZGVlZDRjNDE5MmEzOTNiMmI1NDk0MTg1YzhiZDgwIn0.eyJhdWQiOiIxMTY5MSIsImp0aSI6IjYxYmE0MDRhNmU5NzhjYjMxNGJkZTEyYTkwNDAzOWY3MjBiN2VhZTRlN2ZkZTJjNGExZGVlZDRjNDE5MmEzOTNiMmI1NDk0MTg1YzhiZDgwIiwiaWF0IjoxNjA2ODEwNjMyLCJuYmYiOjE2MDY4MTA2MzIsImV4cCI6MTYwOTMxNjIzMiwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.fPQxgL69Al5X-ctIzLUTMPBFDvgK-1_O3klffQocjdsTbb6R_y7uPmOP6cyHJieZMu2Qx7NXd49bonng-EEJ5IFHw6RMVhZloc9tApvJM6eB2tY5dZWWIBlqaRLe8mJ3lmOpXAs9XJqYNxp5VdAgoGh6hbQe0zO7uq0Nf83RZkL4jq0gpsD3MMhrgLfw7BwqzQVbpQQ7cBLYO1_kebHlSuk5AEOVdSs_WT-47CL9roD65Xe0Fw4VKyoGkGTwG1GVhnsEdlum4JnHvYSybyXwIcmp7VK4N3XFRoNFkulJQ9vNFicWPo8iPWbBd-iS39WuCkfuKl-1X9PAZWrimjhspw"
            }
          >
            <Mapir.Marker
              coordinates={[this.props.long, this.props.lat]}
              anchor="bottom"
              Image={image}
              style={{ width: "20px", height: "20px" }}
            ></Mapir.Marker>
          </Mapir>
        </div>
      </Modal>
    );
  }
}
