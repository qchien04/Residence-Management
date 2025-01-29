package com.ResidenceManagement.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    private String send_email;
    private String receive_email;
    private String content;
    private LocalDateTime time_send;
    private boolean is_read;
    private boolean is_image;

}
