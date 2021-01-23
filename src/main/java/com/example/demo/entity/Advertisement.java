package com.example.demo.entity;

import com.example.demo.entity.ad.AdElement;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
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

    private String url;
    private List<AdElement> elements;
    private List<AdvertisementReview> reviews;

}
