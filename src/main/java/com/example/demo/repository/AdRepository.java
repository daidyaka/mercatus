package com.example.demo.repository;

import com.example.demo.entity.Advertisement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends MongoRepository<Advertisement, String> {

    List<Advertisement> findByEntrepreneurId(String entrepreneurId);

    List<Advertisement> findByTitleIsLikeOrTypeIsLike(String title, String type);

}
