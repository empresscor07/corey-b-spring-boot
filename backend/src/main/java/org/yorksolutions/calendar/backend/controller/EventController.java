package org.yorksolutions.calendar.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yorksolutions.calendar.backend.model.Event;
import org.yorksolutions.calendar.backend.repository.EventRepository;

@RequestMapping("/event") //sets the base path this api will use
@RestController //controller is telling spring we do have endpoints we want to respond to
public class EventController {

    @Autowired //we want to get the one that spring has already created -
    // so spring please give me the product repository you are managing and put it in this variable
    EventRepository eventRepository; //in order to get items from database need to have access to the pantry repository

    //Spring doesn't have this yet so must create new object
    ObjectMapper objectMapper = new ObjectMapper();
    //gets all items from pantry
    @GetMapping("/all") // - we want to make a get request to this path attached to the base path
    String getAllEvents() throws JsonProcessingException { //if can't convert what's in repository to json will throw error
        //list of products comes in as a list not a string so must use object mapper to transform into a json formatted string
        return objectMapper.writeValueAsString(eventRepository.findAll());
    }

    @PostMapping("/add")
    ResponseEntity<?> postEvent(@RequestBody String body) {
        Event event = null;

        try {
            event = objectMapper.readValue(body, Event.class);
            //try taking string that came in from request and convert into a product json object
            eventRepository.save(event);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("message: failure", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("message: success", HttpStatus.OK);
    }

    @DeleteMapping("/delete")
        // ?param1=param1_value
        // delete?id=10
    ResponseEntity<?> deleteEvent(@RequestParam("id") Long id) {
        System.out.print(id);

        try {
            eventRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            System.out.println(e + " This is throwing an exception");
            return new ResponseEntity<>("message: failure", HttpStatus.BAD_REQUEST);
        }
        System.out.println("This should return success");
        return new ResponseEntity<>("message: success", HttpStatus.OK);
    }

    @PutMapping("/update")
    ResponseEntity<?> updateEvent(@RequestParam("id") Long id, @RequestBody Event event) {

        Event updatedEvent = eventRepository.findById(id).orElse(null);
        if (updatedEvent != null) {
            updatedEvent.setName(event.getName());
            updatedEvent.setDescription(event.getDescription());
            updatedEvent.setLocation(event.getLocation());
            updatedEvent.setStartTime(event.getStartTime());
            updatedEvent.setEndTime(event.getEndTime());
            updatedEvent.setInvitees(event.getInvitees());
            if (eventRepository.save(updatedEvent).getId().equals(id)) {
                return new ResponseEntity<>("message: success", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("message: invalid", HttpStatus.EXPECTATION_FAILED);

    }
}