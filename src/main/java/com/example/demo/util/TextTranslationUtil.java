package com.example.demo.util;

import com.google.common.collect.ImmutableList;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class TextTranslationUtil {

    private static final Map<String, String> translationMap;

    private static final Path DEFAULT_LETTERS_TRANSLATION_FILE_PATH =
            Paths.get("src/main/resources/application-data/letters-translation.txt");
    private static final String LETTERS_DELIMITER = "=";
    private static final List<String> SPECIAL_CHARACTERS =
            Arrays.asList(",.-=+()!@#$%^*|{}[]/\\:;`<>?".split(StringUtils.EMPTY));

    static {
        try {
            translationMap = Files.readAllLines(DEFAULT_LETTERS_TRANSLATION_FILE_PATH)
                    .stream()
                    .map(str -> str.split(LETTERS_DELIMITER))
                    .map(arr -> {
                        if (arr.length == 2) {
                            return arr;
                        }
                        if (arr.length == 1) {
                            return new String[]{arr[0], ""};
                        }
                        return new String[]{"", ""};
                    })
                    .collect(Collectors.toMap(arr -> arr[0], arr -> arr[1], (s, s2) -> s));
        } catch (IOException ioException) {
            throw new UncheckedIOException("Unable to instantiate character translation map", ioException);
        }
    }

    public static String translate(String str) {
        Objects.requireNonNull(str, "String should not be null");

        return Arrays.stream(str.toLowerCase().trim().split(""))
                .filter(ch -> !SPECIAL_CHARACTERS.contains(ch))
                .map(ch -> translationMap.getOrDefault(ch, ch))
                .collect(Collectors.joining());
    }

}
