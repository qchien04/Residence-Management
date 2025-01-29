import { useState } from 'react';
import './Chatbox.css';
import Chat from '../../pages/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button } from 'antd';
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user}=useSelector((state:RootState)=>state.authReducer);
  // Hàm để mở/đóng chatbox
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      {/* Nút mở chatbox */}
      <button className="open-chatbox-btn" onClick={toggleChatbox}>
        {isOpen ? "🗙" : "💬"}
      </button>

      {/* Chatbox container */}
      {isOpen && (
        <div className="chatbox-container">
          <Button style={{width:40,position:"absolute",left:10,zIndex:10}} onClick={()=>setIsOpen(false)}>"🗙"</Button>
          {user?<Chat></Chat>:
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          Bạn cần đăng nhập để dùng tính năng này
          </div>}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
