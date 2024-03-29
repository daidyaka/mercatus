package com.tpls.mercatus.service;

import com.tpls.mercatus.entity.Advertisement;
import com.tpls.mercatus.entity.AdvertisementReview;
import com.tpls.mercatus.entity.search.SearchRequestDto;
import com.tpls.mercatus.entity.user.User;
import com.tpls.mercatus.exception.NoRightsException;
import com.tpls.mercatus.exception.ResourceNotFound;
import com.tpls.mercatus.repository.AdRepository;
import com.tpls.mercatus.util.TextTranslationUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
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

    public List<Advertisement> findAdvertisements(SearchRequestDto query) {
        if (StringUtils.isNoneBlank(query.getQuery(), query.getType())) {
            return adRepository.findByTitleIsLikeAndTypeIsLike(query.getQuery(), query.getType(), query.getPageRequest());
        } else if (StringUtils.isNotBlank(query.getQuery())) {
            return adRepository.findByTitle(query.getQuery(), query.getPageRequest());
        } else if (StringUtils.isNotBlank(query.getType())) {
            return adRepository.findByType(query.getType(), query.getPageRequest());
        }
        return Collections.emptyList();
    }

    public List<Advertisement> findAdvertisementsByAdType(SearchRequestDto query) {
        return adRepository.findByType(query.getType(), query.getPageRequest());
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
        foundAd.setRating(reviews.stream()
                .mapToInt(AdvertisementReview::getMark)
                .filter(mark -> mark != -1)
                .average()
                .orElse(0));
        foundAd.setReviews(reviews);
        adRepository.save(foundAd);
    }

    public void removeAd(User user, String adUrl) {
        Optional<Advertisement> ad = adRepository.findByUrl(adUrl);
        if (!ad.isPresent()) {
            throw new ResourceNotFound();
        }

        Advertisement advertisement = ad.get();
        if (!advertisement.getUserId().equals(user.getId())) {
            throw new NoRightsException();
        }

        adRepository.delete(advertisement);
    }

    @NonNull
    public Advertisement getAdByUniqueUrl(String url) {
        return adRepository.findByUrl(url).orElseThrow(ResourceNotFound::new);
    }
}
