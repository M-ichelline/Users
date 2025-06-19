package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Optional;

@Service
public class UserService {
    
    private final Map<String, User> users = new ConcurrentHashMap<>();

    public User createUser(User user) {
        users.put(user.getId(), user);
        return user;
    }

    public Optional<User> getUserById(String id) {
        return Optional.ofNullable(users.get(id));
    }

    public Map<String, User> getAllUsers() {
        return users;
    }
}

