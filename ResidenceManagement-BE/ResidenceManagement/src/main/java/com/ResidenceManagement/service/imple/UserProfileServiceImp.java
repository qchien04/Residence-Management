package com.ResidenceManagement.service.imple;


import com.ResidenceManagement.entity.auth.UserProfile;
import com.ResidenceManagement.exception.UserException;
import com.ResidenceManagement.repository.UserProfileRepo;
import com.ResidenceManagement.security.TokenProvider;
import com.ResidenceManagement.service.auth.UserProfileService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class UserProfileServiceImp implements UserProfileService {

    private final UserProfileRepo userProfileRepo;

    private TokenProvider tokenProvider;


    public UserProfileServiceImp(UserProfileRepo userProfileRepo,TokenProvider tokenProvider) {
        this.userProfileRepo = userProfileRepo;
        this.tokenProvider=tokenProvider;
    }


    @Override
    @Transactional
    public UserProfile save(UserProfile userProfile) {
        return userProfileRepo.save(userProfile);
    }

    @Override
    public UserProfile findById(int id) {
        return null;
    }

    @Override
    public void deleteById(int id) {

    }

    @Override
    public UserProfile findByUsername(String username) {
        return null;
    }

    @Override
    public UserProfile findByUserId(int userId) throws UserException {
        Optional<UserProfile> userProfile= userProfileRepo.findByUserId(userId);
        System.out.println("userid"+" "+userId);
        if(userProfile==null){
            throw new UserException("User profile not found");
        }
        return userProfile.get();
    }

    @Override
    public List<UserProfile> searchUser(String query) {
        return List.of();
    }
}
