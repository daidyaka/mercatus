package com.tpls.paradigme.service;

import com.tpls.paradigme.entity.UploadedMediaItemResponse;
import com.tpls.paradigme.util.ImageUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class StorageService {

    @Value("${app.files.storage.path}")
    private String localStoragePath;

    @Value("${app.files.storage.default-image}")
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

    public UploadedMediaItemResponse loadUserFile(String folderImagePath) {
        try {
            Path path = Paths.get(localStoragePath + folderImagePath);
            return UploadedMediaItemResponse.builder()
                    .mediaType(getMediaType(path.toFile()))
                    .bytes(Files.readAllBytes(path))
                    .build();
        } catch (FileNotFoundException foundException) {
            try {
                return UploadedMediaItemResponse.builder()
                        .mediaType(MediaType.IMAGE_JPEG_VALUE)
                        .bytes(ImageUtil.readImage(defaultImagePath))
                        .isImage(Boolean.TRUE)
                        .build();
            } catch (IOException exception) {
                throw new UncheckedIOException("Cannot retrieve a user image.", exception);
            }
        } catch (IOException exception) {
            throw new UncheckedIOException("Cannot retrieve a user image.", exception);
        }
    }

    public List<UploadedMediaItemResponse> loadUserFiles(String userId) {
        try {
            return Files.list(Paths.get(localStoragePath + userId))
                    .map(Path::toFile)
                    .filter(File::isFile)
                    .map(file -> UploadedMediaItemResponse.builder()
                            .name(file.getName())
                            .link("/media/" + userId + "/" + file.getName())
                            .isImage("image".equals(getMediaType(file).split("/")[0]))
                            .build())
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException("Could not find a user directory in storage", e);
        }
    }

    public void save(InputStream initialStream, String id, String originalFilename) throws IOException {
        byte[] buffer = new byte[initialStream.available()];
        initialStream.read(buffer);

        File targetFile = new File(localStoragePath + id + "/" + originalFilename);
        OutputStream outStream = new FileOutputStream(targetFile);
        outStream.write(buffer);
    }

    @SneakyThrows
    private String getMediaType(File file) {
        return Files.probeContentType(Paths.get(String.valueOf(file)));
//        return new MimetypesFileTypeMap().getContentType(file);
    }

    public boolean removeFile(String fileName, String userId) {
        return new File(localStoragePath + userId + "/" + fileName).delete();
    }
}
