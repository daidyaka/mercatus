package com.example.demo.entity;

import lombok.Data;

@Data
public class SearchDto {

    private String query;
    private String type;
    private SortType sort = SortType.RELEVANCE;

    private int limit;
    private int offset;

    enum SortType {
        RELEVANCE,
        RATING,
        ALPHABET
    }
}
