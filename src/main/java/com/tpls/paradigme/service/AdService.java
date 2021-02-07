package com.tpls.paradigme.service;

import com.tpls.paradigme.entity.Advertisement;
import com.tpls.paradigme.entity.AdvertisementReview;
import com.tpls.paradigme.entity.SearchDto;
import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.exception.NoRightsException;
import com.tpls.paradigme.exception.ResourceNotFound;
import com.tpls.paradigme.repository.AdRepository;
import com.tpls.paradigme.util.TextTranslationUtil;
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

    public List<Advertisement> findAdvertisements(SearchDto query) {
        if (StringUtils.isNoneBlank(query.getQuery(), query.getType())) {
            return adRepository.findByTitleIsLikeAndTypeIsLike(query.getQuery(), query.getType(), query.getPageRequest());
        } else if (StringUtils.isNotBlank(query.getQuery())){
            return adRepository.findByTitleIsLike(query.getQuery(), query.getPageRequest());
        } else if (StringUtils.isNotBlank(query.getType())) {
            return adRepository.findByType(query.getType(), query.getPageRequest());
        }
        return Collections.emptyList();
    }

    public List<Advertisement> findAdvertisementsByAdType(SearchDto query) {
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
