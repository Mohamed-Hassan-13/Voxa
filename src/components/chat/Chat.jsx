import "./chat.css";
const Chat = () => {
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatae.png" alt="" />
          <div className="texts">
            <span>Hamo hassan</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icon"></div>
      </div>
      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default Chat;
