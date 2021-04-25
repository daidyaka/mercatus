package com.tpls.paradigme.entity;

import com.tpls.paradigme.entity.ad.AdElement;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document("advertisements")
public class Advertisement {

    private String id;
    private String userId;

    @NotBlank
    private String title;

    @NotBlank
    private String type;

    @NotBlank
    private String phoneNumber;

    private double rating;

    private String url;
    private String imageUrl;
    private List<AdElement> elements;
    private LocalDateTime dateCreated;
    private List<AdvertisementReview> reviews = new ArrayList<>();
}
