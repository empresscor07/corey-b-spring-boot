package org.yorksolutions.calendar.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.yorksolutions.calendar.backend.model.User;
import org.yorksolutions.calendar.backend.repository.UserRepository;

import java.util.List;

@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/all")
    String getAllUsers() throws JsonProcessingException {
        return objectMapper.writeValueAsString(userRepository.findAll());
    }

    @CrossOrigin
    @PostMapping("/add")
    String postUser(@RequestBody String body) {
        User user = null;
        try {
            user = objectMapper.readValue(body, User.class);
            userRepository.save(user);
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
        return "success";
    }

    @CrossOrigin
    @PostMapping("/login")
    String login(@RequestBody User user) {
        List<User> existingUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (existingUser.isEmpty()) {
            return "Failed";
        } else {
            return "Success";
        }
    }
}

