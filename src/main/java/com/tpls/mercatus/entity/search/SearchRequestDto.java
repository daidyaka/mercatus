package com.tpls.mercatus.entity.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequestDto {

    private String query;
    private String type;

    @NotNull
    private SortType sortType = SortType.RELEVANCE_DESC;

    @Min(0)
    private int limit = 10;

    @Min(0)
    private int page = 0;

    public PageRequest getPageRequest() {
        return PageRequest.of(page, limit, sortType.getSort());
    }

    @Getter
    public enum SortType {
        RELEVANCE_ASC("dateCreated", true),
        RELEVANCE_DESC("dateCreated", false),
        ALPHABET_ASC("title", true),
        ALPHABET_DESC("title", false),
        RATING_ASC("rating", true),
        RATING_DESC("rating", false);

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
