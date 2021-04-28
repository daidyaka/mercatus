package com.tpls.mercatus.controller;

import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.service.StorageService;
import com.tpls.mercatus.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.tpls.mercatus.controller.MediaController.MEDIA_BASE_URL;

@Controller
@RequestMapping(MEDIA_BASE_URL + "/images")
public class ImageMediaController extends MediaController {

    private final UserService userService;

    public ImageMediaController(StorageService storageService, UserService userService) {
        super(storageService);
        this.userService = userService;
    }

    @ResponseBody
    @PostMapping("/upload-avatar")
    public ResponseEntity<?> uploadAvatar(@RequestParam(name = "avatar") MultipartFile file,
                                          Authentication authentication) throws IOException {

        User authenticatedUser = getAuthenticatedUser(authentication);
        storageService.saveAndCompressImage(file.getInputStream(), authenticatedUser.getId(), file.getOriginalFilename());

        authenticatedUser.setImageUrl(file.getOriginalFilename());
        userService.updateUser(authenticatedUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}