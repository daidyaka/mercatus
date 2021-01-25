package com.tpls.paradigme.repository;

import com.tpls.paradigme.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    User findByAuthToken(String authToken);

}
