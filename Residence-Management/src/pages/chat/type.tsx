export type ConversationResponse={
    id?:number;
    user1_email:string,
    user2_email:string,
    user1_avt:string,
    user2_avt:string,
    user1_name:string,
    user2_name:string,
  }

export type CreateConversationRequest={
  emailSend:string,
  emailToSend:string,
}


export type Message={
  id?:number,
  receive_email:string,
  send_email:string,
  content:string,
  time_send:string,
  is_image:boolean,
  is_read:boolean,
}
export type Typing={
  name:string,
  emailSend:string,
  type:string,
  emailReceive:string,
}