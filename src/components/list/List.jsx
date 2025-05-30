import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/ChatStore";
import { useOpenChatlistStore } from "../../lib/openChatlistStore";
import ChatList from "./ChatList/ChatList";
import "./list.css";
import UserInfo from "./UserInfo/UserInfo";

const List = () => {
  const { chatId } = useChatStore();
  const style = {
    position: "absolute",
    backgroundColor: "rgba(17, 25, 40, 0.838)",
    backdropFilter: "blur(19px) saturate(180%)",
  };

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const { isChatlistOpen, closeChatlist, openChatlist } =
    useOpenChatlistStore();

  const HandleOpenClose = () => {
    isChatlistOpen ? closeChatlist() : openChatlist();
  };

  return (
    <div
      className="list"
      style={{
        left: isChatlistOpen ? "0" : "-332px",
        position: chatId && windowWidth < 960 ? "absolute" : "static",
        backgroundColor:
          chatId && windowWidth < 960
            ? "rgba(17, 25, 40, 0.838)"
            : "transparent",
        backdropFilter:
          chatId && windowWidth < 960 ? "blur(19px) saturate(180%)" : "",
      }}
    >
      <div className="xmark" onClick={HandleOpenClose}>
        <img src={isChatlistOpen ? "/xmark2.svg" : "/bars.svg"} alt="" />
      </div>
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
