import Stomp from 'stompjs';
import React, {useRef, memo, useEffect, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Button, Col, Form, Input, Row, Tooltip } from 'antd';
import { SmileOutlined, ArrowRightOutlined, PictureOutlined } from '@ant-design/icons';
import "./chatpart.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';
import { Friend } from '.';
import { Message, Typing } from './type';


type FormSend={
  content:string,
}
type MessageProps = {
  name_send:string,
  message: Message;
  currEmail: string | undefined;
};

const MessageContainer = memo(({name_send, message, currEmail }: MessageProps) => {
  return (
    <div
      className={message.send_email === currEmail ? "inner-outgoing" : "inner-incoming"}
    >
      {message.send_email !== currEmail && (
        <div className="inner-name">{name_send}</div>
      )}
      {message.content && (
        <div className="inner-content">{message.content}</div>
      )}
    </div>
  );
});

type prop={
  currFriend:MutableRefObject<Friend | null>,
  active:boolean,
  stompClientState:Stomp.Client | null;
  currMessageList:Message[]
  setCurrMessageList:Dispatch<SetStateAction<Message[]>>,
  isConnect:boolean,
}

const ChatPart:React.FC<prop> = ({isConnect,currFriend,stompClientState,active,currMessageList,setCurrMessageList}) => {
  const {user}=useSelector((state:RootState)=>state.authReducer);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [form] = Form.useForm();

  const onMessageReceive = (serverRespone: Stomp.Message) => {
    console.log("Received message:", JSON.parse(serverRespone.body));
    const newMessage:Typing=JSON.parse(serverRespone.body)

    if(newMessage.emailSend==currFriend.current?.email){
        handleTyping(newMessage);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight+100; // Cuộn xuống cuối
    }
  }, [currMessageList]); 

  useEffect(() => {
    if(isConnect&&stompClientState){
      stompClientState.subscribe(`/typing/${user?.email}`, onMessageReceive);
  }
  }, [isConnect,stompClientState]); 

  const handleTyping=(data:Typing)=>{
    const elementListTyping=chatBoxRef.current?.querySelector(".inner-list-typing");
    if(elementListTyping){
      if(data.type == "show"){
        const existTyping = elementListTyping.querySelector(`[user-id="${data.emailSend}"]`);
        if(!existTyping){
          const boxTyping = document.createElement("div");
          boxTyping.classList.add("box-typing");
          boxTyping.setAttribute("user-id", data.emailSend);
          boxTyping.innerHTML = `
            <div class="inner-name">${data.name}</div>
            <div class="inner-dots"><span></span><span></span><span></span></div>
          `;
          elementListTyping?.appendChild(boxTyping);
          if(chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight+100; 
        }
      }else {
        if(elementListTyping){
          const boxTypingDelete = elementListTyping.querySelector(`[user-id="${data.emailSend}"]`);
          if(boxTypingDelete) {
            elementListTyping.removeChild(boxTypingDelete);
          }
        }
      
      }
    }
  }

  const sendMessageToRoom = (values:FormSend) => {
    form.resetFields();
    const newMessage:Message={
      send_email:user?user.email:"underfind",
      content:values.content,
      receive_email:currFriend.current?.email||"",
      time_send:moment().format("YYYY-MM-DDTHH:mm:ss"),
      is_read:false,
      is_image:false,
    }
    if (stompClientState && stompClientState.connected) {
      setCurrMessageList(pre=>[...pre,newMessage])
      stompClientState.send("/app/sendMessage", {}, JSON.stringify(newMessage));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  
  const showTyping=()=>{
    let timeOut;
    if (stompClientState && stompClientState.connected) {
      const typing:Typing={
        name:user?user.name:"anh ba xì dầu",
        emailSend:user?user.email:"Vo danh tieu tot",
        type:"show",
        emailReceive:currFriend.current?.email||"",
      }
      stompClientState.send("/app/typing", {}, JSON.stringify(typing));
      clearTimeout(timeOut);
  
      timeOut = setTimeout(() => {
        const hide={
          name:user?user.name:"anh ba xì dầu",
          emailSend:user?user.email:"Vo danh tieu tot",
          type:"hidden",
          emailReceive:currFriend.current?.email||"",
        }
        stompClientState.send("/app/typing", {}, JSON.stringify(hide));
    }, 3000);
    } else {
      console.error("WebSocket is not connected");
    }
  }

  return (
    <>
    {active?<div>
      <div className="container my-3">
        <Row>
          <Col span={24}>
            <div className="chat" my-id={user?.email}>
              <div className="inner-body" ref={chatBoxRef}>
                  {currMessageList.map((message, index) => (
                    <MessageContainer name_send={currFriend.current?.name||""}  key={index} currEmail={user?.email} message={message} />
                  ))}
                <div className="inner-list-typing"/>
              </div>

              {/* Image upload section */}
              <div className="inner-preview-images">
                <div className="custom-file-container" data-upload-id="upload-images" />
              </div>

              {/* Footer with message input */}
              <div className="inner-foot">
                <Form form={form} className="inner-form" onFinish={sendMessageToRoom}>
                  <div className="d-flex">
                    <Form.Item label="content" name="content">
                      <Input
                        type="text"
                        placeholder="Nhập nội dung..."
                        className="flex-grow-1"
                        onChange={showTyping}
                      />
                    </Form.Item>
                    <Tooltip title="Emojis">
                      <Button
                        icon={<SmileOutlined />}
                        className="mx-1"
                        type="text"
                      />
                    </Tooltip>
                    <Tooltip title="Upload Image">
                      <label
                        htmlFor="file-upload-with-preview-upload-images"
                        className="btn btn-sm btn-light mr-1 mb-0"
                      >
                        <PictureOutlined />
                      </label>
                    </Tooltip>
                    <Button
                      htmlType="submit"
                      icon={<ArrowRightOutlined />}
                      type="primary"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>

        
        {/* Emoji picker */}
        <div className="tooltip" role="tooltip">
          <div className="emoji-picker light" />
        </div>
      </div>
    </div>
      
    :
    
    <></>}
    
    </>
  );
};

export default ChatPart;
