package com.tpls.mercatus.service;

import com.tpls.mercatus.entity.user.LoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    public void authenticateUser(LoginDto dto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.getUsername(),
                dto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
