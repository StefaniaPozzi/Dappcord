import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Blockies from "react-blockies";
import send from "../assets/send.svg";
const socket = io("ws://localhost:3030");

const Messages = ({ account, messages, currentChannel }) => {
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageObj = {
      channel: currentChannel.id.toString(),
      account: account,
      text: message,
    };
    if (message !== "") {
      socket.emit("new message", messageObj);
    }
    setMessage("");
  };
  // const scrollHandler = () => {
  //   setTimeout(() => {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }, 500);
  // };

  useEffect(() => {
    scrollHandler();
  });

  return (
    <div className="text">
      <div className="messages">
        {messages
          .filter(
            (message) =>
              currentChannel && message.channel === currentChannel.id.toString()
          )
          .map((message, index) => (
            <div className="message" key={index}>
              <Blockies seed={message.account} />
              <div className="message_content">
                <h3>
                  {message.account.slice(0, 6)}..{message.account.slice(38, 42)}
                </h3>
                <p>{message.text}</p>
              </div>
            </div>
          ))}

        {/*         
        <div ref={messageEndRef} /> */}
      </div>
      <form onSubmit={sendMessage}>
        {currentChannel && account ? (
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        ) : (
          <input
            type="text"
            value=""
            placeholder="Please Connect your Wallet and Join a Channel"
            disabled
          />
        )}

        <button type="submit">
          <img src={send} alt="Send message" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
