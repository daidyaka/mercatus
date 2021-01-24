package com.tpls.paradigme.controller;

import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.exception.NoAuthenticationException;
import com.tpls.paradigme.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

public abstract class AbstractController {

    protected User getAuthenticatedUser(Authentication authentication, UserService userService) {
        return Optional.ofNullable(authentication)
                .filter(Authentication::isAuthenticated)
                .map(auth -> (Jwt) auth.getPrincipal())
                .map(auth -> (String) auth.getClaims().get("username"))
                .map(username -> (User) userService.loadUserByUsername(username))
                .orElseThrow(NoAuthenticationException::new);
    }

    protected User getAuthenticatedUserOrNull(Authentication authentication, UserService userService) {
        try {
            return getAuthenticatedUser(authentication, userService);
        } catch (NoAuthenticationException exception) {
            return null;
        }
    }

}
