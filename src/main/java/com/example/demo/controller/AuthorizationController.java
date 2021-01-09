package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

import static com.example.demo.entity.UserRole.CLIENT;

@Controller
@RequiredArgsConstructor
public class AuthorizationController {

    private final UserService userService;

    @PostMapping("/registration")
    public String register(@Valid User user) {
        userService.createUser(user);
        return "redirect:/client";
    }

    @RequestMapping("/profile-redirect")
    public String profile(Authentication auth) {
        String redirectUrl = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(authority -> CLIENT.toString().equals(authority)) ? "/client" : "/entrepreneur";
        return "redirect:" + redirectUrl + "/profile.html";
    }

    @RequestMapping("/is-authenticated")
    @ResponseBody
    public Map<String, Boolean> isAuthenticated(Authentication auth) {
        return Collections.singletonMap("isAuthenticated", auth != null && auth.isAuthenticated());
    }
}
