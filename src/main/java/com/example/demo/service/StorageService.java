package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.util.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;

@Slf4j
@Service
public class StorageService {

    @Value("${files.storage.path}")
    private String localStoragePath;

    public void saveAndCompressImage(InputStream inputStream, String folderName, String fileName) {
        try {
            ImageUtil.compressImage(inputStream, localStoragePath + folderName, fileName);
        } catch (IOException e) {
            log.error("Error happened while processing uploaded file.");
            throw new UncheckedIOException("Error processing resource", e);
        }
    }

    public byte[] loadFile(String folderImagePath) {
        try {
            return ImageUtil.readImage(localStoragePath + folderImagePath);
        } catch (IOException exception) {
            throw new UncheckedIOException("Cannot retrieve a user image.", exception);
        }
    }

}
