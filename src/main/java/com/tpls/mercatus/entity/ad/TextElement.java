package com.tpls.mercatus.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TextElement extends AdElement {

    private String text;

}
