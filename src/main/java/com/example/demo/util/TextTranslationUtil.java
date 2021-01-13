package com.example.demo.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public final class TextTranslationUtil {

    private static final Map<String, String> translationMap;

    private static final Path DEFAULT_LETTERS_TRANSLATION_FILE_PATH =
            Paths.get("src/main/resources/letters-translation.txt");
    private static final String LETTERS_DELIMITER = "=";

    static {
        try {
            translationMap = Files.readAllLines(DEFAULT_LETTERS_TRANSLATION_FILE_PATH)
                    .stream()
                    .map(str -> str.split(LETTERS_DELIMITER))
                    .filter(arr -> arr.length == 2)
                    .collect(Collectors.toMap(arr -> arr[0], arr -> arr[1]));
        } catch (IOException e) {
            throw new RuntimeException("Unable to instantiate character translation map", e);
        }
    }

    public static String translate(String str) {
        Objects.requireNonNull(str, "String should not be null");

        return Arrays.stream(str.toLowerCase().trim().split(""))
                .map(ch -> translationMap.getOrDefault(ch, ch))
                .collect(Collectors.joining());
    }

}
