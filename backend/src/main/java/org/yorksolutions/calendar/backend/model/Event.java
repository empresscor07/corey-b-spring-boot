package org.yorksolutions.calendar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity //defines the class as something that Spring will use to store in a database
@JsonIgnoreProperties
public class Event {

    @Id //this will be primary key - an entity will need a primary key
    @GeneratedValue(strategy = GenerationType.AUTO) //gets generated value for primary key
    @JsonProperty //this is here to allow the object fields to be jsonified in the repository so that object mapper can read
    Long id;

    @JsonProperty //can pick what you want jsonified
    // and what you don't want sent to frontend take @JsonProperty out
    String name;

    @JsonProperty
    String host;

    @JsonProperty
    Date startTime;

    @JsonProperty
    Date endTime;

    @JsonProperty
    String description;

    @JsonProperty
    String location;

    @JsonProperty
    @ElementCollection
    public List<String> invitees;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getInvitees() {
        return invitees;
    }

}
