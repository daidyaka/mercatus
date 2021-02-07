package com.tpls.paradigme.controller;

import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.exception.NoAuthenticationException;
import com.tpls.paradigme.service.UserService;
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
