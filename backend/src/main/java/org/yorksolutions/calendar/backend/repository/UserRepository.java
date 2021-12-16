package org.yorksolutions.calendar.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.yorksolutions.calendar.backend.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}