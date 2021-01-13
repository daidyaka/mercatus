package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import com.example.demo.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ad")
@RequiredArgsConstructor
public class AdvertisementController {

    private final AdService adService;

    @GetMapping("/{uniqueUrl}.html")
    public String article(@PathVariable String uniqueUrl, Model model) {
        Advertisement foundAd = adService.getAdByUniqueUrl(uniqueUrl);
        model.addAttribute("ad", foundAd);
        return "article";
    }

}
