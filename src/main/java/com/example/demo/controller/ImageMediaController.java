package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.example.demo.controller.MediaAbstractController.MEDIA_BASE_URL;

@RestController
@RequestMapping(MEDIA_BASE_URL + "/image")
public class ImageMediaController extends MediaAbstractController {

    public ImageMediaController(StorageService storageService) {
        super(storageService);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestHeader("file") MultipartFile file,
                                    Authentication authentication) throws IOException {

        User authenticatedUser = getAuthenticatedUser(authentication);
        storageService.saveAndCompressImage(file.getInputStream(), authenticatedUser.getId(), file.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}