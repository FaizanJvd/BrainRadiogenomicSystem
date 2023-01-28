import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useNavigate } from "react-router-dom";
const Video = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const { currentUser, recieverId } = useSelector((state) => state.user);
  const [stream, setStream] = useState();
  const [userSignal, setUserSignal] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    // make user online and get and get its socket id
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", currentUser);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    socket.current.on("someOne-calling", (data) => {
      console.log("someOne-calling", data);
      setReceivingCall(true);
      setCallerSignal(data.signal);
    });
    // socket.current.on("callEnded", () => {
    //   setCallEnded(true);
    //   connectionRef.current.destroy();
    //   myVideo.current.srcObject=null;
    //   userVideo.current.srcObject = null;
    //   socket.current.emit("disconnect");
    // });
  }, []);

  const cal = () => {
    callUser(recieverId);
  };
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.current.on("callAccepted", (signal) => {
      console.log("callAccepted", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });
    peer.signal(userSignal);

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: recieverId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  useEffect(() => {
    socket.current.on("callEnded", () => {
      connectionRef.current.destroy();
      setCallEnded(true);
      userVideo.current.srcObject = null;
    });
  }, []);
  const leaveCall = () => {
    setCallEnded(true);
    userVideo.current.srcObject = null;
    socket.current.emit("endCall", { to: recieverId });
  };
  const goBack = (e) => {
    e.preventDefault();
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    socket.current.emit("remove-user",currentUser);
    navigate(-1);
  };

  return (
    <>
      <button className="btn btn-info mt-1 ms-1" onClick={goBack}>
        <i className="bi bi-caret-left-fill"></i>Back
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="p-3">
          {stream && (
            <video
              id="localVideo"
              ref={myVideo}
              autoPlay
              muted
              style={{ width: "500px" }}
            ></video>
          )}
        </div>
        <div className="ms-3 p-3 mx-3">
          {callAccepted && !callEnded && (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "500px" }}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center">
        {callAccepted && !callEnded ? (
          <button className="btn btn-danger" onClick={leaveCall}>
            <i class="bi bi-telephone-fill"></i>
            END
          </button>
        ) : (
          <button className="btn btn-danger" onClick={() => cal()}>
            <i class="bi bi-telephone-fill"></i>
            CALL
          </button>
        )}
      </div>

      {/* Alert of Call */}
      <div>
        {receivingCall && !callAccepted ? (
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Recieving Call...</h4>
            <hr />
            <div className="d-flex">
              <button className="btn btn-success" onClick={answerCall}>
                Answer
              </button>
              <button
                type="button"
                class="btn btn-danger ms-3"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                decline
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Video;
