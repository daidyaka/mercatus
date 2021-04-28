package com.tpls.mercatus.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadedMediaItemResponse {

    private String link;
    private String name;
    private boolean isImage;

    private String mediaType;
    private byte[] bytes;

}
