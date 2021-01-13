package com.example.demo.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class YoutubeVideoElement extends AdElement {

    private String videoLink;

    @Override
    public String markup() {
        return String.format(
                "<iframe width='560' height='315' src='%s' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
                videoLink
        );
    }
}
