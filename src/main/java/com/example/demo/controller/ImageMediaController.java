package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.example.demo.controller.MediaAbstractController.MEDIA_BASE_URL;

@RestController
@RequestMapping(MEDIA_BASE_URL + "/images")
public class ImageMediaController extends MediaAbstractController {

    public ImageMediaController(StorageService storageService) {
        super(storageService);
    }

    @GetMapping
    @ResponseBody
    public List<String> getAll(Authentication authentication) {
        return storageService.loadUserFiles(
                getAuthenticatedUser(authentication).getId()
        );
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam(name = "file") MultipartFile file,
                                    Authentication authentication) throws IOException {

        User authenticatedUser = getAuthenticatedUser(authentication);
        storageService.saveAndCompressImage(file.getInputStream(), authenticatedUser.getId(), file.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}