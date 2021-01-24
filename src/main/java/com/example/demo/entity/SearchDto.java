package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchDto {

    private String query;
    private String type;
    @NotNull
    private SortType sortType = SortType.RELEVANCE_DESC;

    @Min(0)
    private int limit = 10;
    @Min(0)
    private int page = 0;

    public String getQuery() {
        return Optional.ofNullable(query).orElse(StringUtils.EMPTY);
    }

    public String getType() {
        return Optional.ofNullable(type).orElse(StringUtils.EMPTY);
    }

    @Getter
    public enum SortType {
        RELEVANCE_ASC("dateCreated", true),
        RELEVANCE_DESC("dateCreated", false),
        ALPHABET_ASC("title", true),
        ALPHABET_DESC("title", false),
        RATING_ASC("title", true),   //TODO
        RATING_DESC("title", false); //TODO

        private final Sort sort;

        SortType(String sortByField, boolean ascending) {
            Sort sort = Sort.by(sortByField);
            if (ascending) {
                sort = sort.ascending();
            } else {
                sort = sort.descending();
            }
            this.sort = sort;
        }
    }
}
