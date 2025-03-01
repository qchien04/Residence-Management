package com.ResidenceManagement.service;


import com.ResidenceManagement.entity.auth.Permission;
import com.ResidenceManagement.entity.auth.Role;
import com.ResidenceManagement.service.auth.UserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component("userDetailsService")
public class UserDetailsCustom implements UserDetailsService {
    private UserService userService;

    public UserDetailsCustom(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.ResidenceManagement.entity.auth.User user=this.userService.findByUsername(username);
        if(user==null){
            user=this.userService.findByEmail(username);
            if (user==null){
                throw new RuntimeException("User not found : "+username);
            }
        }

        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        for (Role role : user.getRoles()) {
            for (Permission permission: role.getPermissions() ){
                authorities.add(new SimpleGrantedAuthority( permission.getPermissionName() ) );
            }
        }
        return new User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
