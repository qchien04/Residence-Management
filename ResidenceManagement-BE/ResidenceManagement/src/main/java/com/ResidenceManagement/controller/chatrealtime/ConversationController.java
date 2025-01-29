package com.ResidenceManagement.controller.chatrealtime;

import com.ResidenceManagement.entity.chatrealtime.Conversation;
import com.ResidenceManagement.exception.ConversationException;
import com.ResidenceManagement.exception.UserException;
import com.ResidenceManagement.request.CreateConversationRequest;
import com.ResidenceManagement.response.ApiResponse;
import com.ResidenceManagement.service.chatrealtime.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;


    @PostMapping("/create")
    public ResponseEntity<Conversation> createConversationHandler(@RequestBody CreateConversationRequest createConversationRequest) throws UserException, ConversationException {

        Conversation conversation=conversationService.createConversation(createConversationRequest.getEmailSend(), createConversationRequest.getEmailToSend());

        return new ResponseEntity<Conversation>(conversation, HttpStatus.CREATED);
    }



    @GetMapping("/allConversation")
    public ResponseEntity<List<Conversation>> findAllConversationByUserEmailHandler(@RequestHeader("Authorization") String jwt)
            throws UserException {
        System.out.println("lay room");

        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<Conversation> chats = conversationService.findAllConversationByUserEmail(email);

        return new ResponseEntity<List<Conversation>>(chats, HttpStatus.OK);
    }


}