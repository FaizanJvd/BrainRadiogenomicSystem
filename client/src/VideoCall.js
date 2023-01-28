import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {io} from "socket.io-client";
// import { useLocation } from "react-router-dom";
import Peer from "simple-peer";
const VideoCall = () => {
  const { currentUser, recieverId } = useSelector((state) => state.user);
  const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const socket = useRef();
  const connectionRef = useRef();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState({});
  const [name, setName] = useState("Fazi");
//   const location = useLocation();
//   const socket = location.socket;
  
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
      socket.current = io("ws://localhost:8800");
      socket.current.emit("new-user-add",currentUser);
      socket.current.on('get-users', (users) => {
        console.log("users",users);
        const user = users.find((user) => user.userId === recieverId);
        if(user){
          socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
            console.log("call",call);
          });
        }
        else{
            console.log("not call");
        }
    });
    // 
  }, [callEnded]);
  const answerCall = () => {
    setCallAccepted(true);
    setCallEnded(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: currentUser,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    connectionRef.current.destroy();
    socket.disconnect();
    // window.location.reload();
    setStream(null);
    socket.current = null;
    setCallAccepted(false);
    setCallEnded(true);
  };
  return (
    <>
    
    <div className="d-flex">
        {
            stream && (
              <div>
                <video id="localVideo" ref={myVideo} autoPlay muted></video>
                <button onClick={callUser}>Call</button>
                </div>
            )
        }
      {
          callAccepted && !callEnded && (
              <video id="remoteVideo" ref={userVideo} autoPlay></video>
              ) || <h1 style={{color:'red'}}>"Calling..."</h1>
            }
    </div>
    <div className="d-flex justify-content-center">
        <button onClick={leaveCall} className="btn btn-danger">END</button>
    </div>
    <div>
      {call.isReceivingCall && !callAccepted && (
          <button onClick={answerCall}>Answer</button>)}
    </div>
    </>
  );
};

export default VideoCall;
