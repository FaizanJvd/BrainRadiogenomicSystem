import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import {io} from "socket.io-client";
import {useNavigate } from "react-router-dom";
const Chat = () => {
  const socket = useRef();
  const {currentUser,recieverId,chatId} = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recieveMessage, setRecieveMessage] = useState({text:'',senderId:''});
  const navigate = useNavigate();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    getMessagesFromDb();
  }, [currentUser]);
  const scroll = useRef();

  const addMessage = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add",currentUser);
  }, [currentUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if(newMessage===""){
      return window.alert("Please enter a message");
    }
    setMessages([...messages, { text: newMessage, senderId: currentUser }]);
    sendMessageToDb();
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chatId,
  }
  const receiverId = recieverId;
  // send message to socket server
    socket.current.emit("send-message",{...message, receiverId});
    setNewMessage("");
  };
  useEffect(() => {
    setMessages([...messages,recieveMessage]);
    console.log("messages",messages);
  }, [recieveMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(" revi data",data);
      if (data != null && data.chatId === chatId) {
        setRecieveMessage({text:data.text, senderId: data.senderId});
        console.log("recieveMessage",recieveMessage);
      }
    });
  },[]);
 const sendMessageToDb = async () => {
    const res = await fetch("http://localhost:4000/chat/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        senderId: currentUser,
        text: newMessage
      }),
    });
    const data = await res.json();
  }

  const getMessagesFromDb = async () => {
    const res = await fetch("http://localhost:4000/chat/getMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId:chatId,
      }),
    });
    const data = await res.json();
    if(res.status===201){
      setMessages(data);
    }
  };
  async function endChat() {
    socket.current.emit("remove-user",currentUser);
    navigate("/patientRoutes/doctor");
  };
  return (
    <>
      <div class="container-fluid position-relative">
        <div class="col-xs-12 ">
          {/* <!-- Panel Chat --> */}
            <div class="panel-heading mt-2">
              <h3 class="panel-title fw-semibold fw-semibold fs-2 fst-italic text-primary">
                <i class="bi bi-chat" aria-hidden="true"></i> Chat
              </h3>
              {/* <button onClick={()=>navigate('/patientRoutes/videoCall')}>Video</button> */}
              
            </div>
          <div class="panel" id="chat">
            <div class="panel-body">
              <div class="chats">
                {messages.length == 0 ? (
                  <h1>Start Conversation</h1>
                ) : (
                  messages.map((messages) => (
                    <>
                      <div
                        ref={scroll}
                        className={
                          messages.senderId == currentUser ? "chat" : "chat chat-left"
                        }
                      >
                        <div class="chat-avatar">
                          <a
                            class="avatar avatar-online"
                            data-toggle="tooltip"
                            href="#"
                            data-placement="right"
                            title=""
                            data-original-title="June Lane"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                              alt="..."
                            />
                            <i></i>
                          </a>
                        </div>
                        <div className="chat-body">
                          <div className="chat-content">
                            <span>{messages.text}</span>
                            <time class="chat-time" datetime="2015-07-01T11:39">
                              11:39:57 am
                            </time>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                      )}
              </div>
            </div>
          </div>
          {/* <!-- End Panel Chat --> */}
        </div>
        <div class="panel-footer position-absolute top-100 start-50 translate-middle">
          <form>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Say something"
                value={newMessage}
                onChange={addMessage}
              />
              <span class="d-flex input-group-btn ms-2">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={sendMessage}
                >
                  <i className="bi bi-send"></i>
                </button>
                <button
                  class="btn btn-danger ms-2"
                  type="button"
                  onClick={()=>endChat()}
                >
                  End
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Chat;
