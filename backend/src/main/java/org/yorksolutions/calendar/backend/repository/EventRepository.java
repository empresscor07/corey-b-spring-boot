package org.yorksolutions.calendar.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.yorksolutions.calendar.backend.model.Event;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findEventByStartTimeAfterAndEndTimeBefore(Date startWindow, Date endWindow);
}