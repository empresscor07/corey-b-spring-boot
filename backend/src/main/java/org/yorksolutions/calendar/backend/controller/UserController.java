package org.yorksolutions.calendar.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yorksolutions.calendar.backend.model.User;
import org.yorksolutions.calendar.backend.repository.UserRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
    ResponseEntity<?> login(@RequestBody User unverifiedUser) {
        List<User> userList = (List<User>) userRepository.findAll();
        userList = userList
                .stream()
                .filter(u -> Objects.equals(u.getUsername(), unverifiedUser.getUsername()))
                .collect(Collectors.toList());
        if (!userList.isEmpty()) {
            User user = userList.get(0);
            if (Objects.equals(user.getPassword(), unverifiedUser.getPassword())) {
                return new ResponseEntity<>("message: success", HttpStatus.OK);
            }
            return new ResponseEntity<>("message: invalid", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("message: invalid", HttpStatus.UNAUTHORIZED);
    }
}

