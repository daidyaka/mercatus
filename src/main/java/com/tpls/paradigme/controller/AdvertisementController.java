package com.tpls.paradigme.controller;

import com.google.common.collect.ImmutableMap;
import com.tpls.paradigme.entity.Advertisement;
import com.tpls.paradigme.entity.AdvertisementReview;
import com.tpls.paradigme.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;
import java.util.stream.Stream;

@RestController
@RequestMapping("/ad")
@RequiredArgsConstructor
public class AdvertisementController extends AbstractController {

    private final AdService adService;

    @GetMapping("/{uniqueUrl}")
    public ImmutableMap<String, Object> article(@PathVariable String uniqueUrl) {
        Advertisement foundAd = adService.getAdByUniqueUrl(uniqueUrl);
        OptionalDouble averageMark = Optional.ofNullable(foundAd.getReviews())
                .map(List::stream)
                .orElse(Stream.empty())
                .mapToInt(AdvertisementReview::getMark)
                .average();
        return ImmutableMap.of("ad", foundAd,
                "averageReviewMark", averageMark.orElse(0));
    }

    @PostMapping("/{adUrl}/review")
    public ResponseEntity<?> createReview(@Valid AdvertisementReview review, @PathVariable String adUrl) {
        adService.updateAdWithNewReview(adUrl, review);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .header(HttpHeaders.LOCATION, "/ad/" + adUrl)
                .build();
    }

}
