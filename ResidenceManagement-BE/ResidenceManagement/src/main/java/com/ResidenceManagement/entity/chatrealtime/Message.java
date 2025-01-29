package com.ResidenceManagement.entity.chatrealtime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "content")
    private String content;

    @Column(name = "is_read")
    private boolean is_read;

    @Column(name = "is_image")
    private boolean is_image;

    @Column(name = "time_send")
    private LocalDateTime time_send;

    @Column(name = "send_email")
    private String send_email;

    @Column(name = "receive_email")
    private String receive_email;



}
