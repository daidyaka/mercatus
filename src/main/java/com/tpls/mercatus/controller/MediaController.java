package com.tpls.mercatus.controller;

import com.tpls.mercatus.entity.UploadedMediaItemResponse;
import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.tpls.mercatus.controller.MediaController.MEDIA_BASE_URL;

@RequestMapping(MEDIA_BASE_URL)
@RequiredArgsConstructor
@Slf4j
@RestController
public class MediaController extends AbstractController {

    protected static final String MEDIA_BASE_URL = "/media";
    protected final StorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam List<MultipartFile> files,
                                    Authentication authentication) {

        User authenticatedUser = getAuthenticatedUser(authentication);
        files.forEach(file -> fileUpload(authenticatedUser, file));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/my/all")
    public List<UploadedMediaItemResponse> getAll(Authentication authentication) {
        String userId = getAuthenticatedUser(authentication).getId();
        return storageService.loadUserFiles(userId);
    }

    @GetMapping(value = "/{userId}/{fileName}")
    public ResponseEntity<byte[]> loadImage(@PathVariable String userId, @PathVariable String fileName) {
        UploadedMediaItemResponse itemResponse = storageService.loadUserFile(userId + '/' + fileName);
        return ResponseEntity.ok()
                .contentType(Optional.ofNullable(itemResponse.getMediaType())
                        .map(MediaType::parseMediaType)
                        .orElse(MediaType.IMAGE_JPEG))
                .body(itemResponse.getBytes());
    }

    @DeleteMapping("/my/{fileName}/remove")
    public boolean deleteFile(@PathVariable String fileName, Authentication authentication) {
        User authenticatedUser = getAuthenticatedUser(authentication);
        return storageService.removeFile(fileName, authenticatedUser.getId());
    }

    private void fileUpload(User authenticatedUser, MultipartFile file) {
        try {
            if ("image/jpeg".equals(file.getContentType())) {
                storageService.saveAndCompressImage(file.getInputStream(), authenticatedUser.getId(), file.getOriginalFilename());
            } else {
                storageService.save(file.getInputStream(), authenticatedUser.getId(), file.getOriginalFilename());
            }
        } catch (IOException e) {
            log.error("Error uploading a file", e);
        }
    }
}



