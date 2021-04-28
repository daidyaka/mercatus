package com.tpls.mercatus.controller;

import com.google.common.collect.ImmutableMap;
import com.tpls.mercatus.entity.Advertisement;
import com.tpls.mercatus.entity.AdvertisementReview;
import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.service.AdService;
import com.tpls.mercatus.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/ad")
@RequiredArgsConstructor
public class AdvertisementController extends AbstractController {

    private final AdService adService;
    private final UserService userService;

    @GetMapping("/{uniqueUrl}")
    public ImmutableMap<String, Object> article(@PathVariable String uniqueUrl) {
        Advertisement foundAd = adService.getAdByUniqueUrl(uniqueUrl);
        User user = userService.findById(foundAd.getUserId()).orElse(null);
        return ImmutableMap.of("ad", foundAd, "author", user);
    }

    @PostMapping("/{adUrl}/review")
    public ResponseEntity<?> createReview(@Valid AdvertisementReview review, @PathVariable String adUrl) {
        adService.updateAdWithNewReview(adUrl, review);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .header(HttpHeaders.LOCATION, "/ad/" + adUrl)
                .build();
    }

    @DeleteMapping("/{adUrl}/delete")
    public ResponseEntity<?> deleteAd(@PathVariable String adUrl, Authentication authentication) {
        User authenticatedUser = getAuthenticatedUser(authentication);
        adService.removeAd(authenticatedUser, adUrl);
        return ResponseEntity.ok("Advertisement deleted.");
    }


}
