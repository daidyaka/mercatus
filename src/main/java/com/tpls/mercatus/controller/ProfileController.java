package com.tpls.mercatus.controller;

import com.google.common.collect.ImmutableMap;
import com.tpls.mercatus.entity.Advertisement;
import com.tpls.mercatus.entity.error.ValidationError;
import com.tpls.mercatus.entity.user.ChangePasswordDto;
import com.tpls.mercatus.entity.user.ChangeUserDataDto;
import com.tpls.mercatus.entity.user.LoginDto;
import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.service.AdService;
import com.tpls.mercatus.service.AuthenticationService;
import com.tpls.mercatus.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public ResponseEntity<Object> register(@Valid User user,
                                           @RequestParam String repeatPassword,
                                           @RequestParam(value = "avatar", required = false) MultipartFile file) throws IOException {
        if (!Objects.equals(user.getPassword(), repeatPassword)) {
            return ResponseEntity.badRequest().body(ValidationError.builder()
                    .errors(ImmutableMap.of("password", "Пароли не совпадают!", "repeatPassword", ""))
                    .build());
        }

        boolean created = userService.createUser(user, file);

        if (!created) {
            return ResponseEntity.badRequest().body(ValidationError.builder()
                    .errors(Collections.singletonMap("email", "Этот email уже занят"))
                    .build());
        }

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
    public ResponseEntity<Object> updatePassword(Authentication auth, @Valid ChangePasswordDto dto) {
        if (!Objects.equals(dto.getNewPassword(), dto.getNewPasswordRepeated())) {
            return ResponseEntity.badRequest().body(ValidationError.builder()
                    .errors(Collections.singletonMap("newPassword", "Пароли не совпадают!"))
                    .build());
        }

        User authenticatedUser = getAuthenticatedUser(auth);
        boolean isUpdated = userService.updatePassword(authenticatedUser, dto);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(ValidationError.builder()
                    .errors(Collections.singletonMap("oldPassword", "Пароль введен неверно!"))
                    .build());
        }

        return ResponseEntity.ok(true);
    }

}
