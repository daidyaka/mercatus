package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.exception.NoAuthenticationException;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public abstract class AbstractController {

    protected User getAuthenticatedUser(Authentication authentication) {
        return Optional.ofNullable(authentication)
                .filter(Authentication::isAuthenticated)
                .map(auth -> (User) auth.getPrincipal())
                .orElseThrow(NoAuthenticationException::new);
    }

    protected User getAuthenticatedUserOrNull(Authentication authentication) {
        try {
            return getAuthenticatedUser(authentication);
        } catch (NoAuthenticationException exception) {
            return null;
        }
    }

}