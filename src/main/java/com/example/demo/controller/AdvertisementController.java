package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import com.example.demo.entity.AdvertisementReview;
import com.example.demo.entity.User;
import com.example.demo.exception.NoAuthenticationException;
import com.example.demo.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.stream.Stream;

@Controller
@RequestMapping("/ad")
@RequiredArgsConstructor
public class AdvertisementController extends AbstractController {

    private final AdService adService;

    @GetMapping("/{uniqueUrl}.html")
    public String article(@PathVariable String uniqueUrl, Authentication authentication, Model model) {
        model.addAttribute("user", getCurrentUser(authentication));

        Advertisement foundAd = adService.getAdByUniqueUrl(uniqueUrl);
        OptionalDouble averageMark = Optional.ofNullable(foundAd.getReviews())
                .map(List::stream)
                .orElse(Stream.empty())
                .mapToInt(AdvertisementReview::getMark)
                .average();

        model.addAttribute("ad", foundAd);
        model.addAttribute("averageReviewMark", averageMark.orElse(0));

        return "article";
    }

    @PostMapping("/{adUrl}/review")
    public String createReview(@Valid AdvertisementReview review, @PathVariable String adUrl) {
        adService.updateAdWithNewReview(adUrl, review);
        return "redirect:/ad/" + adUrl + ".html";
    }

    private User getCurrentUser(Authentication authentication) {
        try {
            return getAuthenticatedUser(authentication);
        } catch (NoAuthenticationException ex) {
            return null;
        }
    }

}
