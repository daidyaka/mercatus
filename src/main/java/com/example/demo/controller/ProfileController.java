package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import com.example.demo.entity.User;
import com.example.demo.service.AdService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final AdService adService;
    private final UserService userService;

    @RequestMapping("/get")
    @ResponseBody
    public Map<String, Boolean> isAuthenticated(Authentication auth) {
        return Collections.singletonMap("isAuthenticated", auth != null && auth.isAuthenticated());
    }

    @PostMapping("/create")
    public String register(@Valid User user) {
        userService.createUser(user);
        return "redirect:/profile";
    }

    @ResponseBody
    @GetMapping("/advertisements")
    public List<Advertisement> getCurrentUserAdvertisements(Authentication auth) {
        String userId = getCurrentUser(auth).getId();
        return adService.getAdsByEntrepreneurId(userId);
    }

    @PostMapping("/create-ad")
    public ResponseEntity<String> createAd(@RequestBody Advertisement ad, Authentication auth) {
        ad.setEntrepreneurId(getCurrentUser(auth).getId());
        adService.createAd(ad);
        return ResponseEntity.created(URI.create("/ad/" + ad.getUrl()))
                .body("Advertisement created.");
    }

    private User getCurrentUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }

}
