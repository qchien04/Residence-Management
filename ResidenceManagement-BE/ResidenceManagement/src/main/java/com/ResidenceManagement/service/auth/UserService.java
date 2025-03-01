package com.ResidenceManagement.service.auth;

import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.exception.UserException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User findById(int id) throws UserException;
    public User findByUsername(String username);
    public void deleteById(int id);
    public User findByEmail(String email);
    public User findByJwt(String jwt) throws UserException;
    public List<User> searchUser(String query);
    public User save(User user);
}
