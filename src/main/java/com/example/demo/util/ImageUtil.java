package com.example.demo.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ImageUtil {

    private static final String JPEG_FILE_FORMAT = "jpg";

    public static byte[] readImage(String imagePath) throws IOException {
        // Prepare buffered image.
        BufferedImage img = ImageIO.read(new FileInputStream(imagePath));

        // Create a byte array output stream.
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        // Write to output stream
        ImageIO.write(img, "jpg", bao);

        return bao.toByteArray();
    }

    public static void compressImage(InputStream inputStream, String folderPath, String fileName) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(inputStream);

        ByteArrayOutputStream os = new ByteArrayOutputStream();

        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(JPEG_FILE_FORMAT);
        ImageWriter writer = writers.next();

        ImageOutputStream ios = ImageIO.createImageOutputStream(os);
        writer.setOutput(ios);

        ImageWriteParam param = writer.getDefaultWriteParam();

        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(0.1f);
        writer.write(null, new IIOImage(bufferedImage, null, null), param);

        createUserDirectory(folderPath);
        try (FileOutputStream fos = new FileOutputStream(folderPath + '/' + fileName)) {
            os.writeTo(fos);
        }

        os.close();
        ios.close();
        writer.dispose();
    }

    private static void createUserDirectory(String pathToSave) {
        File userDirectory = new File(pathToSave);
        if (!userDirectory.exists()) {
            userDirectory.mkdir();
        }
    }
}
