package com.tpls.paradigme.controller;

import com.tpls.paradigme.entity.Advertisement;
import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.service.AdService;
import com.tpls.paradigme.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
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
    public Map<String, Object> isAuthenticated(Authentication auth) {
        User user = getAuthenticatedUserOrNull(auth);

        Map<String, Object> userProps = new HashMap<>();
        userProps.put("isAuthenticated", user != null);
        if (user != null) {
            userProps.put("userId", user.getId());
        }
        return userProps;
    }

    @ResponseBody
    @RequestMapping(value = "/avatar", produces = "`image/jpeg`")
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
        return adService.getAdsByUserId(userId);
    }

    @PostMapping("/create-ad")
    public ResponseEntity<String> createAd(@RequestBody @Valid Advertisement ad, Authentication auth) {
        ad.setUserId(getAuthenticatedUser(auth).getId());
        adService.createAd(ad);
        return ResponseEntity.created(URI.create("/ad/" + ad.getUrl()))
                .body("Advertisement created.");
    }

}
