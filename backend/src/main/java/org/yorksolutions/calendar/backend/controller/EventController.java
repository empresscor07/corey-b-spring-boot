package org.yorksolutions.calendar.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;
import org.yorksolutions.calendar.backend.model.Event;
import org.yorksolutions.calendar.backend.model.Window;
import org.yorksolutions.calendar.backend.repository.EventRepository;

import java.util.List;
import java.util.Optional;

@RequestMapping("/event") //sets the base path this api will use
@RestController //controller is telling spring we do have endpoints we want to respond to
public class EventController {

    // if we take out autowired it no longer has access to the main repository,
    // nothing is found in this new repository and nothing is saved to the main repository
    // error: Cannot invoke "org.yorksolutions.calendar.backend.repository.EventRepository.findAll()" because "this.eventRepository" is null
    @Autowired //we want to get the one that spring has already created -
    // so spring please give me the product repository you are managing and put it in this variable
    EventRepository eventRepository; //in order to get items from database need to have access to the pantry repository

    //Spring doesn't have this yet so must create new object
    ObjectMapper objectMapper = new ObjectMapper();
    //gets all items from pantry
    @CrossOrigin
    @GetMapping("/all") // - we want to make a get request to this path attached to the base path
    String getAllEvents() throws JsonProcessingException { //if can't convert what's in repository to json will throw error
        //list of products comes in as a list not a string so must use object mapper to transform into a json formatted string
        return objectMapper.writeValueAsString(eventRepository.findAll());
    }

    @CrossOrigin
    @PostMapping("/add")
    String postEvent(@RequestBody String body) {
        try {
            Event event = objectMapper.readValue(body, Event.class);
            //try taking string that came in from request and convert into a product json object
            eventRepository.save(event);
        } catch (JsonProcessingException e) {
            return "Failed";
        }
        return "Created";
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    String deleteEvent(@PathVariable("id") Long id) {
        System.out.print(id);
        try {
            eventRepository.deleteById(id);
            return "Deleted";
        } catch (EmptyResultDataAccessException e) {
            System.out.println(e + " This is throwing an exception");
            return "Failed";
        }
    }

    @CrossOrigin
    @PutMapping("/edit")
    String updateEvent(@RequestBody Event event) {
        Event eventToUpdate = eventRepository.findById(event.getId()).orElse(null);
        if (eventToUpdate != null) {
          eventRepository.save(event);
          return "Updated";
        }
        return "Failed";
    }

    @CrossOrigin
    @PostMapping("/window")
    String getEventsInWindow(@RequestBody String body) throws JsonProcessingException {
        Window window = objectMapper.readValue(body, Window.class);
        List<Event> eventsInWindow = eventRepository.findEventByStartTimeAfterAndEndTimeBefore(window.getStartDate(), window.getEndDate());
        return objectMapper.writeValueAsString(eventsInWindow);
    }
}