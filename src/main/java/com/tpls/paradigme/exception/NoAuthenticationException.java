package com.tpls.paradigme.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NoAuthenticationException extends RuntimeException {

    public NoAuthenticationException() {
        super("No authentication were provided.");
    }
}
