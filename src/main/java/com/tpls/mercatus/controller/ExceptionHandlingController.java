package com.tpls.mercatus.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tpls.mercatus.entity.error.ValidationError;
import com.tpls.mercatus.exception.ResourceNotFound;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlingController {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @ExceptionHandler(ResourceNotFound.class)
    public String handleResourceNotFoundException(@ModelAttribute Model model) {
        return "404";
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<String> handleBindException(BindException exception) throws JsonProcessingException {
        ValidationError error = new ValidationError("Request arguments are not valid");
        exception.getFieldErrors().forEach(err -> error.getErrors().put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(OBJECT_MAPPER.writeValueAsString(error));
    }
}
