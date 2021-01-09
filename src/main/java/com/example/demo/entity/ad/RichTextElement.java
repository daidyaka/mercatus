package com.example.demo.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RichTextElement extends AdElement {

    private String text;

    @Override
    public String markup() {
        return text;
    }
}
