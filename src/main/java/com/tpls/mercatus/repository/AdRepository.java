package com.tpls.mercatus.repository;

import com.tpls.mercatus.entity.Advertisement;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdRepository extends MongoRepository<Advertisement, String> {

    @Query("{'title': {$regex: ?0, $options: 'i'}, 'type': {$regex: ?1, $options: 'i'}}")
    List<Advertisement> findByTitleIsLikeAndTypeIsLike(String title, String type, Pageable pageable);

    @Query("{'title': {$regex: ?0, $options: 'i'}}")
    List<Advertisement> findByTitle(String title, PageRequest of);

    List<Advertisement> findByType(String type, PageRequest of);

    List<Advertisement> findByUserId(String userId);

    Optional<Advertisement> findByUrl(String url);

}
