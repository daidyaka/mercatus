package com.example.demo.service;

import com.example.demo.entity.Advertisement;
import com.example.demo.exception.ResourceNotFound;
import com.example.demo.repository.AdRepository;
import com.example.demo.util.TextTranslationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdService {

    private final AdRepository adRepository;

    public List<Advertisement> getAdsByEntrepreneurId(String entrepreneurId) {
        return adRepository.findByEntrepreneurId(entrepreneurId);
    }

    public List<Advertisement> getAdsByPatternSearch(String query) {
        return adRepository.findByTitleIsLikeOrTypeIsLike(query, query);
    }

    public void createAd(Advertisement ad) {
        String uniqueIdentifier = UUID.randomUUID().toString().substring(0, 8);
        ad.setUrl(TextTranslationUtil.translate(ad.getTitle()) + "-" + uniqueIdentifier);
        adRepository.insert(ad);
    }

    @NonNull
    public Advertisement getAdByUniqueUrl(String url) {
        return adRepository.findByUrl(url).orElseThrow(ResourceNotFound::new);
    }
}
