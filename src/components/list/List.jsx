import ChatList from "./ChatList/ChatList";
import "./list.css";
import UserInfo from "./UserInfo/UserInfo";

const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
