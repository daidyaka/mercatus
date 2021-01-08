package com.example.demo.entity;

import com.example.demo.entity.ad.AdElement;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("advertisements")
public class Advertisement {

    private String id;
    private String entrepreneurId;

    private String title;
    private String type;
    private List<AdElement> elements;

}
