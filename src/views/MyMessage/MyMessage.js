import React, { useState, useEffect } from "react";
import NavigationBottom from "../../components/NavigationBottom/NavigationBottom";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Routes } from "../../api/api";
import MessageBox from "../../components/MessageBox/MessageBox";
import MailOutlineTwoToneIcon from "@material-ui/icons/MailOutlineTwoTone";
const myMsg = (props) => {
  const [msgs, setMsgs] = useState([]);
  const [back, setBack] = useState(false);

  console.log(msgs);
  useEffect(() => {
    let token = localStorage.getItem("token");
    getMessages(token);
  }, []);

  const getMessages = (token) => {
    let Messages = [];
    let message = localStorage.getItem("messages");
    let oldMsgs = JSON.parse(message);
    console.log("MSG", oldMsgs);
    // // let oldLength = oldMsgs.length;

    Messages = oldMsgs;
    axios
      .put(`${Routes.GetMessages}`, {}, { headers: { token: token } })
      .then((res) => {
        console.log(res);
        let status = res.data.responseCode;
        let msgs = res.data.value.response;
        console.log("msg", msgs);
        if (status === 200 && msgs.length !== 0) {
          console.log(status);
          let mixed = Messages.concat(msgs);
          console.log(mixed);
          // remove duplicate msgs
          let Sorted = Array.from(new Set(mixed.map((old) => old.id))).map(
            (id) => {
              return mixed.find((old) => old.id === id);
            }
          );

          console.log(Sorted);
          if (Sorted.length !== 0) {
            // console.log(Sorted.length);
            // console.log(oldLength);
            // let newLength = Sorted.length - oldLength;
            Messages = Sorted;
            localStorage.setItem("messages", JSON.stringify(Messages));
            setMsgs(Messages);

            Sorted.map((msg) => {
              axios
                .put(
                  `${Routes.IRecivedMessages}`,
                  { id: msg.id },
                  { headers: { token: token } }
                )
                .then((res) => console.log("sent confirm", res))
                .catch((err) => console.log(err.response));
            });
          } else {
            return setMsgs(oldMsgs);
          }
        } else {
          return setMsgs(oldMsgs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.history.pushState(
      { name: "browserBack" },
      "on browser back click",
      window.location.href
    );
  }, []);
  window.onpopstate = () => {
    setBack(true);
  };
  useEffect(() => {
    back ? popStateListener() : console.log("false");
  }, [back]);
  var backButtonPrevented = false;

  function popStateListener(event) {
    console.log("BACK");
    if (backButtonPrevented === false) {
      window.history.pushState(
        { name: "browserBack" },
        "on browser back click",
        window.location.href
      );
      backButtonPrevented = true;
      setBack(false);
    } else {
      window.removeEventListener("popstate", popStateListener);
    }
  }

  return (
    <div style={{ backgroundColor: "lightgrey", minBlockSize: "100vh" }}>
      <Header text="پیام ها" click={() => props.history.push("/profile")} />
      <div
        style={{
          paddingTop: 70,
          paddingBottom: "11vh",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {msgs && msgs.length !== 0 ? (
          msgs.map((ms) => {
            return (
              <div key={ms.id} style={{ padding: 5 }}>
                <MessageBox
                  id={ms.formatId}
                  time={
                    ms.creationJalaliDateTime !== null &&
                    ms.creationJalaliDateTime.split(" ").pop()
                  }
                  //  style={styles.img}
                  date={
                    ms.creationJalaliDateTime !== null &&
                    ms.creationJalaliDateTime.split(" ").shift()
                  }
                  message={ms.messageContent}
                  imgLink={ms.messageLink != null && ms.messageLink}
                  vidLink={ms.messageLink != null && ms.messageLink}
                  pressed={() => console.log(ms.id)}
                />
              </div>
            );
          })
        ) : (
          <div style={{ marginTop: "55%", height: "55vh", direction: "rtl" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "IRANSansMobile",
                color: "#CD0448",
                fontSize: 14,
              }}
            >
              <MailOutlineTwoToneIcon style={{ marginLeft: 5 }} />
              <span>پیامی جهت نمایش وجود ندارد.</span>
            </div>
          </div>
        )}
      </div>

      <NavigationBottom item="PROFILE" />
    </div>
  );
};

export default myMsg;
