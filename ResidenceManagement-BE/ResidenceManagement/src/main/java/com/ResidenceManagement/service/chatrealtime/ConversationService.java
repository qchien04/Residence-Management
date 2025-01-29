package com.ResidenceManagement.service.chatrealtime;


import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.chatrealtime.Conversation;
import com.ResidenceManagement.exception.ConversationException;
import com.ResidenceManagement.exception.UserException;

import java.util.List;


public interface ConversationService {

    public Conversation createConversation(String email1, String email2) throws ConversationException;

    public List<Conversation> findAllConversationByUserEmail(String email);

}
