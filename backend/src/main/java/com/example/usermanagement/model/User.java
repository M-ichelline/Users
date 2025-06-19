package com.example.usermanagement.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public class User {
    private String id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    public User() {
        this.id = UUID.randomUUID().toString();
    }

    public User(String name, String email) {
        this();
        this.name = name;
        this.email = email;
    }

   
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

