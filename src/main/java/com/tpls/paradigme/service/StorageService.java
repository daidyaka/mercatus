package com.tpls.paradigme.service;

import com.tpls.paradigme.util.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class StorageService {

    @Value("${files.storage.path}")
    private String localStoragePath;

    @Value("${files.storage.default-image}")
    private String defaultImagePath;

    public void createUserFolder(String userId) {
        new File(localStoragePath + userId).mkdir();
    }

    public void saveAndCompressImage(InputStream inputStream, String folderName, String fileName) {
        try {
            ImageUtil.compressImage(inputStream, localStoragePath + folderName, fileName);
        } catch (IOException e) {
            log.error("Error happened while processing uploaded file.");
            throw new UncheckedIOException("Error processing resource", e);
        }
    }

    public byte[] loadUserFile(String folderImagePath) {
        try {
            return ImageUtil.readImage(localStoragePath + folderImagePath);
        } catch (FileNotFoundException foundException) {
            try {
                return ImageUtil.readImage(defaultImagePath);
            } catch (IOException exception) {
                throw new UncheckedIOException("Cannot retrieve a user image.", exception);
            }
        } catch (IOException exception) {
            throw new UncheckedIOException("Cannot retrieve a user image.", exception);
        }
    }

    public List<String> loadUserFiles(String userId) {
        try {
            return Files.list(Paths.get(localStoragePath + userId))
                    .map(Path::toFile)
                    .filter(File::isFile)
                    .map(File::getAbsolutePath)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException("Could not find a user directory in storage", e);
        }
    }

}
