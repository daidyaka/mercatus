package com.tpls.paradigme.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class YoutubeVideoElement extends AdElement {

    private String videoLink;

}
