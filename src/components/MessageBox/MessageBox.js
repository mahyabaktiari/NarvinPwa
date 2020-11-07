import React, { useState, useEffect } from "react";

const MessageBox = (props) => {
  return (
    <>
      <div style={styles.container}>
        <div
          style={
            props.id === 3
              ? [styles.messageContainer, { paddingRight: 0 }]
              : styles.messageContainer
          }
        >
          {
            props.id === 2 || props.id === 4 ? (
              <img
                key={Math.random()}
                style={{
                  width: "70%",
                  height: "30%",
                  marginTop: "5%",
                  alignSelf: "center",
                }}
                src={props.imgLink}
                resizeMode="contain"
              />
            ) : null
            // props.id === 3 &&
            // props.vidLink !== null && (
            //   <VideoPlayer
            //     resizeMode="cover"
            //     source={{uri: props.vidLink}}
            //     style={styles.backgroundVideo}
            //     seekColor={'red'}
            //     disableVolume={true}
            //     disableBack={true}
            //     disableFullscreen={true}
            //     paused={true}
            //   />
            // )
          }
          {props.id === 2 || props.id === 3 || props.id === 4 ? null : (
            <span style={styles.msgText}>{props.message}</span>
          )}
          <div style={{ paddingTop: 2 }} />
          <div style={styles.heading}>
            <span style={styles.time}>{props.time}</span>
            <span style={styles.date}>{props.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBox;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  heading: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 5px 2px",
    marginRight: "2%",
    boxSizing: "border-box",
  },
  messageContainer: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#eee",
    border: "1px solid #707070",
    paddingRight: 5,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  time: {
    fontFamily: "IRANSansMobile",
    fontSize: 12,
    color: "#565252",
  },
  date: {
    fontFamily: "IRANSansMobile",
    fontSize: 12,
    color: "#565252",
  },
  msgText: {
    fontFamily: "IRANSansMobile",
    fontSize: 14,
    color: "#CD0448",
    paddingRight: "2%",
    paddingTop: "2%",
    paddingLeft: "2%",
    textAlign: "justify",
    direction: "rtl",
  },
  backgroundVideo: {
    //  width: wp(90),
    //height: hp(40),
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
};
