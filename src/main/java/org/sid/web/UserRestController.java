package org.sid.web;

import java.util.List;

import org.sid.dao.UserRepository;
import org.sid.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
public class UserRestController {

	@Autowired
	UserRepository userRepository;


	//-------------------Retrieve All Users--------------------------------------------------------

	@RequestMapping(value="/user/", method=RequestMethod.GET)
	public ResponseEntity<List<User>> listAllUsers() {
		List<User> users = userRepository.findAll();
		if(users.isEmpty()){
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT); //You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}


	//-------------------Retrieve Single User--------------------------------------------------------

	@RequestMapping(value="/user/{id}", method=RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable("id") long id) {
		System.out.println("Fetching User with id " + id);
		User user = userRepository.findById(id);
		if (user == null) {
			System.out.println("User with id " + id + " not found");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}


	//-------------------Create a User--------------------------------------------------------

	@RequestMapping(value="/user/", method=RequestMethod.POST)
	public ResponseEntity<Void> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
		System.out.println("Creating User " + user.getUsername());

//		if (userRepository.isUserExist(user)) {
//			System.out.println("A User with name " + user.getUsername() + " already exists");
//			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
//		}

		userRepository.save(user);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}


	//------------------- Update a User --------------------------------------------------------

	@RequestMapping(value="/user/{id}", method=RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
		System.out.println("Updating User " + id);

		User currentUser = userRepository.findById(id);

		if (currentUser == null) {
			System.out.println("User with id " + id + " not found");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

		currentUser.setUsername(user.getUsername());

		userRepository.save(currentUser);
		return new ResponseEntity<User>(currentUser, HttpStatus.OK);
	}

	
	//------------------- Delete a User --------------------------------------------------------

	@RequestMapping(value="/user/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
		System.out.println("Fetching & Deleting User with id " + id);

		User user = userRepository.findById(id);
		if (user == null) {
			System.out.println("Unable to delete. User with id " + id + " not found");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}

		userRepository.delete(id);
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}


	//------------------- Delete All Users --------------------------------------------------------

	@RequestMapping(value="/user/", method=RequestMethod.DELETE)
	public ResponseEntity<User> deleteAllUsers() {
		System.out.println("Deleting All Users");

		userRepository.deleteAll();
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}

}