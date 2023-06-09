import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { SocketContext } from "../../contexts/SocketContext";

function PeerChat() {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    setName,
    me,
    loggedIn,
    callUser,
    leaveCall,
    answerCall,
    textMessage,
    setTextMessage,
    setUsername,
    sendMessage,
  } = useContext<any>(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  const handleMessageInput = (e: any) => {
    setTextMessage(e.target.value);
  };

  const handleNameInput = (e: any) => {
    setName(e.target.value);
  };
  const handleCallInput = (e: any) => {
    setIdToCall(e.target.value);
  };

  useEffect(() => {
    console.log("test", callAccepted, call);
  }, [call, callAccepted]);

  return (
    <div id="peerchat_videos" className={styles.peerchat_container}>
      {stream && (
        <div>
          <p>{name}</p>
          <video
            className={styles.video_player}
            id="user_1"
            autoPlay
            ref={myVideo}
            playsInline
            muted
          ></video>
        </div>
      )}

      {callAccepted && !callEnded && (
        <div>
          <p>{call.name}</p>
          <video
            className={styles.video_player}
            id="user_2"
            autoPlay
            ref={userVideo}
            playsInline
          ></video>
        </div>
      )}
      <div>
        <div>
          <p>Account info</p>
          <input type="text" value={name} onChange={handleNameInput} />
          <p>{me}</p>
        </div>
        <div>
          <p>Make a call</p>
          <input type="text" value={idToCall} onChange={handleCallInput} />
          {callAccepted && !callEnded ? (
            <button onClick={leaveCall}>Hang Up</button>
          ) : (
            <button onClick={() => callUser(idToCall)}>Call</button>
          )}
        </div>
        <div>
          {call.isReceivingCall && (
            <div>
              <p>Notifications</p>
              <p>{call.name} is calling</p>
              <button onClick={answerCall}>Answer</button>
            </div>
          )}
        </div>
        <div>
          {
            <div>
              {loggedIn && (
                <>
                  <input
                    type="text"
                    value={textMessage}
                    onChange={handleMessageInput}
                  />
                  <button onClick={() => sendMessage()}>send message</button>
                </>
              )}

              <button onClick={() => setUsername()}>Let me chat!</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default PeerChat;
