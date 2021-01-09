package com.example.demo.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ImageElement extends AdElement {

    private String src;

    @Override
    public String markup() {
        return String.format(
                "<img src='%s' alt='Image component'/>",
                src
        );
    }
}
