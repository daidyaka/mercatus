package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFound;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

@Controller
public class ExceptionHandlingController extends DefaultHandlerExceptionResolver {

    @ExceptionHandler(ResourceNotFound.class)
    public String handleResourceNotFoundException(@ModelAttribute Model model) {
        return "404";
    }

}
