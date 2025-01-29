package com.ResidenceManagement.service.chatrealtime;




import com.ResidenceManagement.entity.chatrealtime.Message;
import com.ResidenceManagement.request.SendMessageRequest;

import java.util.List;

public interface MessageService {
    public Message sendMessage(SendMessageRequest req);

    public Message createMessage(Message message);

    public Message createMessageFromRequest(SendMessageRequest req);

    public List<Message> findAllMessageBy2Email(String email1, String email2);;


}
