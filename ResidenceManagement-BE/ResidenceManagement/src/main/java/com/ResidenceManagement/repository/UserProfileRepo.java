package com.ResidenceManagement.repository;

import com.ResidenceManagement.entity.auth.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile,Integer> {
    Optional<UserProfile> findByName(String name);
    Optional<UserProfile> findById(int id);
    Optional<UserProfile> findByUserId(Integer userId);
}
