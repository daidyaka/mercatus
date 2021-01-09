package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import com.example.demo.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequestMapping("/search")
@RequiredArgsConstructor
@RestController
public class SearchController {

    private final AdService adService;

    @GetMapping
    public List<Advertisement> findAds(@RequestParam(name = "query", defaultValue = "") String query) {
        return adService.getAdsByPatternSearch(query);
    }

}
