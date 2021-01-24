package com.example.demo.repository;

import com.example.demo.entity.Advertisement;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdRepository extends MongoRepository<Advertisement, String> {

    List<Advertisement> findByTitleIsLikeOrTypeIsLike(String title, String type, Pageable pageable);

    List<Advertisement> findByType(String type, PageRequest of);

    List<Advertisement> findByUserId(String userId);

    Optional<Advertisement> findByUrl(String url);

}
