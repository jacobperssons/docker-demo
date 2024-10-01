package com.cygni.azure.repository;

import com.cygni.azure.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends MongoRepository<Todo, Integer> {
    List<Todo> findByUser(String user);
}
