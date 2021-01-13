package com.example.demo.controller;

import com.example.demo.entity.Advertisement;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ad")
public class AdvertisementController {

    @GetMapping("/{adTitle}")
    public Advertisement

}
