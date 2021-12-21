package org.yorksolutions.calendar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity //defines the class as something that Spring will use to store in a database
@JsonIgnoreProperties
public class Invitee {

    @Id //this will be primary key - an entity will need a primary key
    @GeneratedValue(strategy = GenerationType.AUTO) //gets generated value for primary key
    @JsonProperty //this is here to allow the object fields to be jsonified in the repository so that object mapper can read
    Long id;

    @JsonProperty //can pick what you want jsonified
    // and what you don't want sent to frontend take @JsonProperty out
    String invitee;
}