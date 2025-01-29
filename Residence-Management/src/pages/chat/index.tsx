import { useEffect, useRef, useState } from "react";
import { ConversationResponse, CreateConversationRequest, Message } from "./type";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import chatService from "../../services/chatService";

import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import RoomChatListBar from "./RoomChatListBar";
import ChatPart from "./ChartPart";
import { Col, Row } from "antd";
import WebRTCTest from "./VideoCall";


export interface Friend{
    name:string,
    email:string,
    avt:string,
}

const Chat:React.FC =()=>{
    const [stompClientState, setStompClientState] = useState<Stomp.Client | null>(null);
    const [isConnect,setIsConnect]=useState<boolean>(false);

    const [inputValue, setInputValue] = useState<string>("");


    const [currConversation,setCurrConversation]=useState<ConversationResponse|null>(null);
    const [allConversation,setAllConversation]=useState<ConversationResponse[]>([])
    const [currMessageList,setCurrMessageList]=useState<Message[]>([]);

    const currFriend = useRef<Friend | null>(null);
    const {user}=useSelector((state:RootState)=>state.authReducer);
    
    useEffect(()=>{
        if(currFriend.current) 
          (async()=>{  
            const getMessageRoomChat=await chatService.getMessageRoom(user?user.email:"None",currFriend.current?.email||"");
            setCurrMessageList(getMessageRoomChat);
          })() 
    },[currFriend.current])

    useEffect(()=>{
        (async()=>{ 
            const allconversation=await chatService.getUserChatRooms();

            setAllConversation(allconversation);
            if(!stompClientState) connect();
        })()
    },[])

    useEffect(()=>{
        if(isConnect&&stompClientState){
            const subscription = stompClientState.subscribe(`/friend/${user?.email}`, onMessageReceive);
            return () => {
                subscription.unsubscribe();
            };
        }
    },[isConnect])

    const onMessageReceive = (serverRespone: Stomp.Message) => {
        const newMessage:Message=JSON.parse(serverRespone.body)
        console.log(newMessage.send_email)
        console.log(currFriend.current?.email)
        if(newMessage.send_email==currFriend.current?.email){
            setCurrMessageList(prevMessages => [...prevMessages, newMessage]);
        }
      };

    
    const connect = () => {
        const socket = new SockJS("http://localhost:8080/sockjs");
        const stompClient = Stomp.over(socket);
        setStompClientState(stompClient);

        stompClient.connect({}, () => {
            console.log('WebSocket connected');
            setIsConnect(true);
        }, errorCallback);
    };

    const errorCallback = (error: string | Stomp.Frame) => {
        if (typeof error === 'string') {
            console.error("Error socket: " + error);
        } else {
            console.error("Error frame: ", error);
        }
    };


    const handleclick=async()=>{
        const ob:CreateConversationRequest={
            emailSend:user?.email||"ok",
            emailToSend:inputValue,
        }
        const res=await chatService.createConversation(ob);

        if(res){
            const ok=res as ConversationResponse;
            setAllConversation((pre)=>[...pre,ok]);
        }
    }
    const changeConversationHandle=(friend:Friend,currconversation:ConversationResponse)=>{
        setCurrConversation(currconversation);
        currFriend.current=friend;
    }



    return(
        <>
        <WebRTCTest active={currFriend.current==null?false:true} curremail={user?user.email:""} emailToCall={currFriend}></WebRTCTest> 
        <Row>
            <Col span={6}>
                <RoomChatListBar allConversation={allConversation}
                                currConversation={currConversation}
                                changeConversationHandle={changeConversationHandle}
                ></RoomChatListBar>
            </Col>

            <Col span={18}>
                <ChatPart  currFriend={currFriend}
                            active={currFriend.current==null?false:true}
                            stompClientState={stompClientState}
                            currMessageList={currMessageList}
                            setCurrMessageList={setCurrMessageList}
                            isConnect={isConnect}
                ></ChatPart>
            </Col>
        </Row>
        <Row>
             <input placeholder="email" onChange={(e) => setInputValue(e.target.value)}></input>
            <button onClick={handleclick}>Thêm bạn</button>
        </Row>
           
        </>
    );
}

export default Chat;