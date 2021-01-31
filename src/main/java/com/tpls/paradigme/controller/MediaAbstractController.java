package com.tpls.paradigme.controller;

import com.tpls.paradigme.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/media")
@RequiredArgsConstructor
public abstract class MediaAbstractController extends AbstractController {

    protected static final String MEDIA_BASE_URL = "/media";
    protected final StorageService storageService;

}
