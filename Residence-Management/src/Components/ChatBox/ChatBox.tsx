import './Chatbox.css';
import Chat from '../../pages/chat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button } from 'antd';
import { OpenChatBox,CloseChatBox } from '../../store/actions/ChatBoxAction';
import { useNavigate } from 'react-router-dom';
const ChatBox = () => {
  const {isOpen}=useSelector((state:RootState)=>state.chatBoxReducer)
  const {user}=useSelector((state:RootState)=>state.authReducer);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  // Hàm để mở/đóng chatbox
  const toggleChatbox = () => {
    if(isOpen) dispatch(CloseChatBox({isOpen:false}))
    else dispatch(OpenChatBox({isOpen:true}));
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
          <Button style={{width:40,position:"absolute",left:10,zIndex:10}} onClick={()=>dispatch(CloseChatBox({isOpen:false}))}>🗙</Button>
          {user?<Chat></Chat>:
          <div style={{position:"absolute",padding:20,margin:20,justifyContent:"center",alignItems:"center"}}>
          Bạn cần đăng nhập để dùng tính năng này
          <Button onClick={()=> navigate("/auth/sign-in")}>Đăng nhập</Button>
          </div>}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
