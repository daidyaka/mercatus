package com.example.demo.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class YoutubeVideoElement extends AdElement {

    private String videoLink;

    @Override
    public String markup() {
        return "youtube video " + videoLink;
    }
}
