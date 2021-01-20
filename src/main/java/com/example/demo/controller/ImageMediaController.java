package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.example.demo.controller.MediaAbstractController.MEDIA_BASE_URL;

@Controller
@RequestMapping(MEDIA_BASE_URL + "/images")
public class ImageMediaController extends MediaAbstractController {

    public ImageMediaController(StorageService storageService) {
        super(storageService);
    }

    @ResponseBody
    @GetMapping("/all")
    public List<String> getAll(Authentication authentication) {
        return storageService.loadUserFiles(
                getAuthenticatedUser(authentication).getId()
        );
    }

    @ResponseBody
    @GetMapping(value = "/{userId}/{imageName}", produces = "image/jpeg")
    public byte[] loadImage(@PathVariable String userId, @PathVariable String imageName) {
        return storageService.loadUserFile(userId + '/' + imageName);
    }

    @GetMapping("/upload")
    public String uploadImagePage() {
        return "upload-image";
    }

    @ResponseBody
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam(name = "image") MultipartFile file,
                                    Authentication authentication) throws IOException {

        User authenticatedUser = getAuthenticatedUser(authentication);
        storageService.saveAndCompressImage(file.getInputStream(), authenticatedUser.getId(), file.getOriginalFilename());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}