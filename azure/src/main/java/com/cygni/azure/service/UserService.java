package com.cygni.azure.service;

import com.cygni.azure.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service
public class UserService {

    List<User> users;

    /* public User getUser(String id) {
        return users
                .stream()
                .filter(user -> user.getId().equals(id))
                .toList()
                .getFirst();
    } */
}
