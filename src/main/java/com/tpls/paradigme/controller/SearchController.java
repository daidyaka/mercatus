package com.tpls.paradigme.controller;

import com.tpls.paradigme.entity.Advertisement;
import com.tpls.paradigme.entity.search.SearchRequestDto;
import com.tpls.paradigme.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/search")
@RequiredArgsConstructor
@RestController
public class SearchController {

    private final AdService adService;

    @GetMapping
    public List<Advertisement> findAds(@Valid SearchRequestDto searchRequestDto) {
        return adService.findAdvertisements(searchRequestDto);
    }

    @GetMapping("/{adType}")
    public List<Advertisement> findSpecificAds(@PathVariable String adType, @Valid SearchRequestDto searchRequestDto) {
        searchRequestDto.setType(adType);
        return adService.findAdvertisementsByAdType(searchRequestDto);
    }

}
