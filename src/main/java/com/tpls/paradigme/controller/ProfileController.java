package com.tpls.paradigme.controller;

import com.tpls.paradigme.entity.Advertisement;
import com.tpls.paradigme.entity.user.ChangePasswordDto;
import com.tpls.paradigme.entity.user.ChangeUserDataDto;
import com.tpls.paradigme.entity.user.LoginDto;
import com.tpls.paradigme.entity.user.User;
import com.tpls.paradigme.service.AdService;
import com.tpls.paradigme.service.AuthenticationService;
import com.tpls.paradigme.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController extends AbstractController {

    private final AdService adService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @GetMapping
    public User profile(Authentication authentication) {
        return getAuthenticatedUser(authentication);
    }

    @RequestMapping("/get")
    public Map<String, Object> isAuthenticated(Authentication auth) {
        User user = getAuthenticatedUserOrNull(auth);

        Map<String, Object> userProps = new HashMap<>();
        userProps.put("isAuthenticated", user != null);
        if (user != null) {
            userProps.put("user", user);
        }
        return userProps;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid LoginDto dto) {
        authenticationService.authenticateUser(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @RequestMapping(value = "/avatar", produces = "image/jpeg")
    public byte[] getProfilePhoto(Authentication authentication) {
        User authenticatedUser = getAuthenticatedUser(authentication);
        return userService.readUserPhoto(authenticatedUser);
    }

    @PostMapping("/create")
    public ResponseEntity<String> register(@Valid User user,
                                           @RequestParam(value = "avatar", required = false) MultipartFile file) throws IOException {
        userService.createUser(user, file);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/advertisements")
    public List<Advertisement> getCurrentUserAdvertisements(Authentication auth) {
        String userId = getAuthenticatedUser(auth).getId();
        return adService.getAdsByUserId(userId);
    }

    @PostMapping("/create-ad")
    public ResponseEntity<String> createAd(@RequestBody @Valid Advertisement ad, Authentication auth) {
        ad.setUserId(getAuthenticatedUser(auth).getId());
        adService.createAd(ad);

        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .header(HttpHeaders.LOCATION, "/ad/" + ad.getUrl())
                .build();
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(Authentication auth, @Valid ChangeUserDataDto dto) {
        User authenticatedUser = getAuthenticatedUser(auth);
        return ResponseEntity.ok(userService.updateUser(authenticatedUser, dto));
    }

    @PostMapping("/update-password")
    public ResponseEntity<Boolean> updatePassword(Authentication auth, @Valid ChangePasswordDto dto) {
        User authenticatedUser = getAuthenticatedUser(auth);
        boolean isUpdated = userService.updatePassword(authenticatedUser, dto);
        return ResponseEntity.status(isUpdated ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(isUpdated);
    }

}
