package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class ExceptionHandlingController extends DefaultHandlerExceptionResolver {

    @Override
    protected ModelAndView handleBindException(BindException ex, HttpServletRequest request,
                                               HttpServletResponse response, Object handler) throws IOException {
        return super.handleBindException(ex, request, response, handler);
    }

}
