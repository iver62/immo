package org.sid.dao;

import org.sid.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findById(long id);
	
	User findByUsername(String username);

}
