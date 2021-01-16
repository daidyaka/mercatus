package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import com.example.demo.entity.User;
import com.example.demo.service.AdService;
import com.example.demo.service.StorageService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController extends AbstractController {

    private final AdService adService;
    private final UserService userService;

    @GetMapping
    public String profile(Authentication authentication, Model model) {
        User authenticatedUser = getAuthenticatedUser(authentication);
        model.addAttribute("user", authenticatedUser);
        return "profile";
    }

    @RequestMapping("/get")
    @ResponseBody
    public Map<String, Boolean> isAuthenticated(Authentication auth) {
        return Collections.singletonMap("isAuthenticated", auth != null && auth.isAuthenticated());
    }

    @ResponseBody
    @RequestMapping(value = "/avatar", produces = "image/jpeg")
    public byte[] getProfilePhoto(Authentication authentication) {
        User authenticatedUser = getAuthenticatedUser(authentication);
        return userService.readUserPhoto(authenticatedUser);
    }

    @PostMapping("/create")
    public String register(@Valid User user,
                           @RequestParam(value = "avatar", required = false) MultipartFile file) throws IOException {
        userService.createUser(user, file);
        return "redirect:/profile";
    }

    @ResponseBody
    @GetMapping("/advertisements")
    public List<Advertisement> getCurrentUserAdvertisements(Authentication auth) {
        String userId = getAuthenticatedUser(auth).getId();
        return adService.getAdsByEntrepreneurId(userId);
    }

    @PostMapping("/create-ad")
    public ResponseEntity<String> createAd(@RequestBody Advertisement ad, Authentication auth) {
        ad.setEntrepreneurId(getAuthenticatedUser(auth).getId());
        adService.createAd(ad);
        return ResponseEntity.created(URI.create("/ad/" + ad.getUrl()))
                .body("Advertisement created.");
    }

}
