package com.tpls.paradigme.entity.ad;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ImageElement extends AdElement {

    private String src;

}
