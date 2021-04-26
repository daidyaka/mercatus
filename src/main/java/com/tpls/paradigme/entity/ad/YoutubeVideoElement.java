package com.tpls.paradigme.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import java.net.URI;
import java.nio.charset.StandardCharsets;

@EqualsAndHashCode(callSuper = true)
@Data
public class YoutubeVideoElement extends AdElement {

    private String videoLink;

    public String getVideoLink() {
        return URLEncodedUtils.parse(URI.create(videoLink), StandardCharsets.UTF_8).stream()
                .filter(param -> param.getName().equals("v"))
                .map(NameValuePair::getValue)
                .findFirst()
                .orElse(videoLink);
    }
}
