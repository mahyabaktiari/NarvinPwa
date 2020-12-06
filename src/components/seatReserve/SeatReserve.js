import React, { useState } from "react";
import { useBusDispatch } from "../../context/busContext";
//import { BlurView } from "@react-native-community/blur";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import useStyle from "./style";
const customStyles = {
  content: {
    width: "70%",
    height: "25vh",
    top: "40vh",
    bottom: 0,
    right: 0,
    left: "15%",
    padding: 0,
    border: "none",
  },
};
const SeatReserve = ({ text, color, seatInfo, onPress, counter }) => {
  const [select, setSelect] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [type, setType] = useState("");
  const [gender, setGender] = useState();
  const dispatch = useBusDispatch();
  const classes = useStyle();

  const selectSeat = (dispatch, select, counter, text, gender) => {
    console.log(select, counter, text, gender);
    if (select) {
      dispatch({
        type: "Select",
        counter: counter - 1,
        seatRequest: text,
        seatRequestGender: `${text}/${gender}`,
      });
    } else {
      dispatch({
        type: "No_Select",
        counter: counter + 1,
        seatRequest: text,
        seatRequestGender: `${text}/${gender}`,
      });
    }
  };

  const unSelect = () => {
    setSelect(!select);
    selectSeat(dispatch, select, counter, text, type === "male" ? "2" : "1");
  };

  const typeSeat = (seatInfo) => {
    switch (seatInfo) {
      case "0":
        return (
          <>
            <button
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                backgroundColor: color ? color : "gray",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                margin: 2,
                border: "none",
                padding: 0,
              }}
              onClick={() => {
                // setSelect(!select);
                select ? unSelect() : setShowGender(true);
                //  selectSeat(dispatch, select, counter, text);
                //  SeatReserve() ;
              }}
            >
              {select ? (
                <div
                  style={{
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    backgroundColor: "#dddddd",
                    borderRadius: 15,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#C0C0C0",
                    border: "none",
                    paddingTop: 5,
                    boxSizing: "border-box",
                  }}
                >
                  {type === "female" ? (
                    <FontAwesomeIcon
                      icon={faFemale}
                      color="green"
                      style={{ fontSize: 40 }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMale}
                      color="green"
                      style={{ fontSize: 40 }}
                    />
                  )}
                </div>
              ) : (
                <span
                  style={{
                    // fontSize:
                    //   Dimensions.get('window').width.toFixed() >= 800
                    //     ? wp(3)
                    //     : wp(4),
                    textAlign: "center",
                    color: "#fff",
                    fontFamily: "BYekan",
                  }}
                >
                  {text}
                </span>
              )}
            </button>
            <Modal
              isOpen={showGender}
              onRequestClose={() => {
                setShowGender(false);
              }}
              style={customStyles}
              overlayClassName={classes.myoverlay}
              contentLabel="Example Modal"
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  padding: "20%",
                  boxSizing: "border-box",
                  height: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{
                      alignItems: "center",
                      width: 50,
                      height: 50,
                      backgroundColor: "#dddddd",
                      borderRadius: 15,
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#C0C0C0",
                      border: "none",
                    }}
                    onClick={() => {
                      setSelect(!select);
                      setShowGender(false);
                      selectSeat(dispatch, select, counter, text, "1");
                      setType("female");
                      // SeatReserve() ;
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFemale}
                      color="red"
                      style={{ fontSize: 40 }}
                    />
                  </button>
                  <span style={{ fontFamily: "IRANSansMobile" }}>خانم</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{
                      alignItems: "center",
                      width: 50,
                      height: 50,
                      backgroundColor: "#dddddd",
                      borderRadius: 15,
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#C0C0C0",
                      border: "none",
                    }}
                    onClick={() => {
                      setSelect(!select);
                      setShowGender(false);
                      selectSeat(dispatch, select, counter, text, "2");
                      setType("male");
                      // SeatReserve() ;
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faMale}
                      color="red"
                      style={{ fontSize: 40 }}
                    />
                  </button>
                  <span style={{ fontFamily: "IRANSansMobile" }}>آقا</span>
                </div>
              </div>
            </Modal>
            {/* <Modal
              transparent={true}
              animated={false}
              animationType={'none'}
              visible={showGender}
              onRequestClose={() => setShowGender(false)}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  height: '20%',
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  top: '60%',
                  borderRadius: 20,
                }}>
                <BlurView
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                  //  viewRef={this.state.viewRef}
                  blurType="extraDark "
                  blurAmount={1}
                  reducedTransparencyFallbackColor="#rrggbb"
                />
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    height: '100%',
                    paddingTop: 10,
                    alignItems: 'center',
                    marginTop: 'auto',
                    zIndex: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 20,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#dddddd',
                        borderRadius: 15,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#C0C0C0',
                        paddingBottom: 5,
                      }}
                      onPress={() => {
                        setSelect(!select);
                        setShowGender(false);
                        selectSeat(dispatch, select, counter, text, '1');
                        setType('female');
                        // SeatReserve() ;
                      }}>
                      <Icon name="female" size={30} color="green" />
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'IRANSansMobile'}}>خانم</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#dddddd',
                        borderRadius: 15,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#C0C0C0',
                        paddingBottom: 5,
                      }}
                      onPress={() => {
                        setSelect(!select);
                        setShowGender(false);
                        selectSeat(dispatch, select, counter, text, '2');
                        setType('male');
                        // SeatReserve() ;
                      }}>
                      <Icon name="male" size={30} color="green" />
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'IRANSansMobile'}}>آقا</Text>
                  </View>
                </View>
              </View>
            </Modal> */}
          </>
        );
      case "1":
        return (
          <button
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              margin: 2,
              border: "none",
            }}
          >
            {/* <Icon name="female" size={30} color="red" /> */}
            <FontAwesomeIcon
              icon={faFemale}
              color="red"
              style={{ fontSize: 40 }}
            />
          </button>
        );
      case "2":
        return (
          <button
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              backgroundColor: "#CCC",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              margin: 2,
              border: "none",
            }}
          >
            {/* <Icon name="male" size={30} color="red" /> */}
            <FontAwesomeIcon
              icon={faMale}
              color="red"
              style={{ fontSize: 40 }}
            />
          </button>
        );
      default:
        break;
    }
  };
  return <>{text !== "0" ? typeSeat(seatInfo) : null}</>;
};

export default SeatReserve;
