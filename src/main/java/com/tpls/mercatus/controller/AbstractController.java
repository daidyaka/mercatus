package com.tpls.mercatus.controller;

import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.exception.NoAuthenticationException;
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
