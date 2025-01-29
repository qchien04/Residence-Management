package com.ResidenceManagement.controller.chatrealtime;

import com.ResidenceManagement.request.SendMessageRequest;
import com.ResidenceManagement.request.TypingPayload;
import com.ResidenceManagement.service.chatrealtime.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class ChatRealTimeController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/news")
    @SendTo("/topic/news")
    public String broadcastNews(@Payload String message) {
        System.out.println("goi new");
        return message;
    }

    @MessageMapping("/sendMessage")
    public void broadcast(@Payload SendMessageRequest sendMessageRequest) {
        messagingTemplate.convertAndSend("/friend/" + sendMessageRequest.getReceive_email(), sendMessageRequest);

        messageService.createMessageFromRequest(sendMessageRequest);
    }
    @MessageMapping("/typing")
    public void typing(@Payload TypingPayload typingPayload) {
        System.out.println(typingPayload);
        messagingTemplate.convertAndSend("/typing/" + typingPayload.getEmailReceive(), typingPayload);
    }

//    @MessageMapping("/personnalmessage")
//    @SendToUser("/queue/personnalmessage")
//    public String reply(@Payload String message,
//                        Principal user) {
//        System.out.println("goi personnalmessage");
//        //System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
//        return message;
//    }
}
