package com.example.demo.service;

import com.example.demo.entity.Advertisement;
import com.example.demo.entity.AdvertisementReview;
import com.example.demo.entity.SearchDto;
import com.example.demo.exception.ResourceNotFound;
import com.example.demo.repository.AdRepository;
import com.example.demo.util.TextTranslationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdService {

    private final AdRepository adRepository;

    public List<Advertisement> getAdsByUserId(String userId) {
        return adRepository.findByUserId(userId);
    }

    public List<Advertisement> findAdvertisements(SearchDto query) {
        return adRepository.findByTitleIsLikeOrTypeIsLike(query.getQuery(), query.getType(),
                PageRequest.of(query.getPage(), query.getLimit(), query.getSortType().getSort()));
    }

    public List<Advertisement> findAdvertisementsByAdType(SearchDto query) {
        return adRepository.findByType(query.getType(), PageRequest.of(query.getPage(), query.getLimit(),
                query.getSortType().getSort()));
    }

    public void createAd(Advertisement ad) {
        String uniqueIdentifier = UUID.randomUUID().toString().substring(0, 8);
        ad.setUrl(TextTranslationUtil.translate(ad.getTitle()) + "-" + uniqueIdentifier);
        ad.setDateCreated(LocalDateTime.now());
        adRepository.insert(ad);
    }

    public void updateAdWithNewReview(String adUrl, AdvertisementReview adReview) {
        Advertisement foundAd = getAdByUniqueUrl(adUrl);
        List<AdvertisementReview> reviews = Optional.ofNullable(foundAd.getReviews()).orElse(new ArrayList<>());
        reviews.add(adReview);
        foundAd.setReviews(reviews);
        adRepository.save(foundAd);
    }

    @NonNull
    public Advertisement getAdByUniqueUrl(String url) {
        return adRepository.findByUrl(url).orElseThrow(ResourceNotFound::new);
    }
}
