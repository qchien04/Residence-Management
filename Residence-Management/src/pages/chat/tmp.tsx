// import React, { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import "./videocall.css";
// import { Modal } from "antd";


// type prop={
//     curremail:string,
//   emailToCall:string,
// }

// const WebRTCTest: React.FC<prop> = ({emailToCall,curremail}) => {
//   const localID = useRef<string>(curremail);
//   const remoteID = useRef<string>(emailToCall);
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
//   const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [isConnect, setIsConnect] = useState<boolean>(false);
//   const [hasLocalPeer, setHasLocalPeer] = useState<boolean>(false);
//   const [localPeer, setLocalPeer] = useState<RTCPeerConnection | null>(null);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const iceServers: RTCConfiguration = {
//     iceServers: [
//       {
//         urls: "stun:stun.l.google.com:19302",
//       },
//     ],
//   };

//   useEffect(() => {
//     const peer = new RTCPeerConnection(iceServers);
//     setLocalPeer(peer);

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         console.log("MediaStream obtained:", stream);
//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//       })
//       .catch((error) => console.error("Error accessing media devices:", error));
    
//     setHasLocalPeer(true);
//     return () => {
//       peer.close();
//     };
//   }, []);

//   useEffect(()=>{
//     if(hasLocalPeer){
//         connect();
//     }
//   },[hasLocalPeer])
//   useEffect(() => {
//     if (isConnect && stompClient && localStream) {
//       stompClient.subscribe(`/topic/${localID.current}/call`, handleIncomingCall);
//       stompClient.subscribe(`/topic/${localID.current}/offer`, handleIncomingOffer);
//       stompClient.subscribe(`/topic/${localID.current}/answer`, handleIncomingAnswer);
//       stompClient.subscribe(`/topic/${localID.current}/candidate`, handleIncomingCandidate);
//       stompClient.send("/app/addUser", {}, localID.current);
//     }
//   }, [isConnect, stompClient,localStream]);

//   const connect = () => {
//     const socket = new SockJS("http://localhost:8080/sockjs2", { debug: false });
//     const client = Stomp.over(socket);
//     setStompClient(client);
//     client.connect({}, (frame) => {
//       console.log("Connected:", frame);
//       setIsConnect(true);
//     });
//   };

//   const handleIncomingCall = (message: Stomp.Message) => {
//     const callerID = message.body;
//     console.log("Incoming call from:", callerID);
//     setIsModalOpen(true);
  
//     if(localPeer) console.log("co peer")
//     if(localStream) console.log("co stream")
//     if (localPeer && localStream) {
//       console.log("ontrack");
//       localPeer.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//           console.log("co video")
//         }
//       };

//       localPeer.onicecandidate = (event) => {
//         if (event.candidate) {
//           const candidate = {
//             type: "candidate",
//             label: event.candidate.sdpMLineIndex,
//             id: event.candidate.candidate,
//           };
//           stompClient?.send(
//             "/app/candidate",
//             {},
//             JSON.stringify({
//               toUser: callerID,
//               fromUser: localID.current,
//               candidate,
//             })
//           );
//         }
//       };

//       localStream.getTracks().forEach((track) => {
//         localPeer.addTrack(track, localStream);
//       });
//       console.log("start offer");
//       localPeer.createOffer().then((description) => {
//         localPeer.setLocalDescription(description);
//         if(stompClient){
//             console.log("ahhahahahah%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
//         }
//         else{
//             console.log("ahhahahahah&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
//         }
//         stompClient?.send(
//           "/app/offer",
//           {},
//           JSON.stringify({
//             toUser: callerID,
//             fromUser: localID.current,
//             offer: description,
//           })
//         );
//       });
//     }
//   };

//   const handleIncomingOffer = (message: Stomp.Message) => {
//     const offer = JSON.parse(message.body).offer;

//     if (localPeer && localStream) {
//       localPeer.setRemoteDescription(new RTCSessionDescription(offer));

//       localPeer.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       localPeer.onicecandidate = (event) => {
//         if (event.candidate) {
//           const candidate = {
//             type: "candidate",
//             label: event.candidate.sdpMLineIndex,
//             id: event.candidate.candidate,
//           };
//           stompClient?.send(
//             "/app/candidate",
//             {},
//             JSON.stringify({
//               toUser: remoteID.current,
//               fromUser: localID.current,
//               candidate,
//             })
//           );
//         }
//       };

//       localStream.getTracks().forEach((track) => {
//         localPeer.addTrack(track, localStream);
//       });

//       localPeer.createAnswer().then((description) => {
//         localPeer.setLocalDescription(description);
//         stompClient?.send(
//           "/app/answer",
//           {},
//           JSON.stringify({
//             toUser: JSON.parse(message.body).fromUser,
//             fromUser: localID,
//             answer: description,
//           })
//         );
//       });
//     }
//   };

//   const handleIncomingAnswer = (message: Stomp.Message) => {
//     const answer = JSON.parse(message.body).answer;

//     if (localPeer) {
//       localPeer.setRemoteDescription(new RTCSessionDescription(answer));
//     }
//   };

//   const handleIncomingCandidate = (message: Stomp.Message) => {
//     const candidate = JSON.parse(message.body).candidate;

//     const iceCandidate = new RTCIceCandidate({
//       sdpMLineIndex: candidate.label,
//       candidate: candidate.id,
//     });
//     localPeer?.addIceCandidate(iceCandidate);
//   };

//   const acceptCall=()=>{
    
//   }
//   const call = () => {
//     stompClient?.send(
//       "/app/call",
//       {},
//       JSON.stringify({
//         callTo: remoteID.current,
//         callFrom: localID.current,
//       })
//     );
//   };


//   return (
    
//     <div className="videoCall-Container">

//       <Modal
//         title="Xác nhận hành động"
//         open={isModalOpen}
//         onOk={acceptCall}
//         onCancel={()=>{setIsModalOpen(false)}}
//         okText="Đồng ý"
//         cancelText="Từ chối"
//         style={{
//           top: 100, // Tùy chỉnh khoảng cách từ trên xuống
//           left: 50, // Tùy chỉnh khoảng cách từ trái
//         }}
//       >
//         <p>Bạn có chắc chắn muốn thực hiện hành động này không?</p>
//       </Modal>
//       <video className="local-video" ref={localVideoRef} autoPlay muted ></video>
//       <video className="remote-video" ref={remoteVideoRef} autoPlay ></video>

//       <button onClick={call}>Call</button>
//     </div>
//   );
// };

// export default WebRTCTest;
