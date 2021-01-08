package com.example.demo.service;

import com.example.demo.entity.Advertisement;
import com.example.demo.repository.AdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        adRepository.insert(ad);
    }

}
