package com.ResidenceManagement.entity.chatrealtime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "conversation")
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user1_email")
    private String user1_email;
    @Column(name = "user2_email")
    private String user2_email;

    @Column(name = "user1_avt")
    private String user1_avt;
    @Column(name = "user1_name")
    private String user1_name;

    @Column(name = "user2_avt")
    private String user2_avt;
    @Column(name = "user2_name")
    private String user2_name;
}
