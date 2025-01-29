package com.ResidenceManagement.service.imple;


import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.chatrealtime.Conversation;
import com.ResidenceManagement.exception.ConversationException;
import com.ResidenceManagement.repository.ConversationRepo;
import com.ResidenceManagement.service.auth.UserService;
import com.ResidenceManagement.service.chatrealtime.ConversationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ConversationServiceImp implements ConversationService {

    private ConversationRepo conversationRepo;
    private UserService userService;


    @Override
    @Transactional
    public Conversation createConversation(String email_req, String email_recieve) throws ConversationException {
        System.out.println("Vao day");
        User user1 = this.userService.findByEmail(email_req);
        User user2 = this.userService.findByEmail(email_recieve);
        Conversation isChatExist = conversationRepo.findConversationBy2UserEmail(email_req, email_recieve);
        if (isChatExist != null) {
            System.out.println("khac null");
            throw new ConversationException("Duplicate");
        }
        Conversation chat = new Conversation();
        chat.setUser1_email(email_req);
        chat.setUser1_avt(user1.getUserProfile().getAvt());
        chat.setUser1_name(user1.getUserProfile().getName());

        chat.setUser2_email(email_recieve);
        chat.setUser2_avt(user2.getUserProfile().getAvt());
        chat.setUser2_name(user2.getUserProfile().getName());

        chat = conversationRepo.save(chat);
        return chat;
    }

//    public Conversation findChatRoomById(Integer chatId) throws ChatException {
//        return conversationRepo.findById(chatId)
//                .orElseThrow(() -> new ChatException("The requested chat is not found"));
//    }
    @Override
    public List<Conversation> findAllConversationByUserEmail(String email) {

        List<Conversation> chats = conversationRepo.findAllConversationByUserEmail(email);

        return chats;

    }

}
