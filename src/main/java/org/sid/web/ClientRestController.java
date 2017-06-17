package org.sid.web;

import java.util.List;

import org.sid.dao.ClientRepository;
import org.sid.entities.Bail;
import org.sid.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/client")
public class ClientRestController {
	
	@Autowired
	private ClientRepository clientRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Client> getClients() {
//			@RequestParam(name="page", defaultValue="0") int page,
//			@RequestParam(name="size", defaultValue="10") int size) {
		return clientRepository.findAll(/*new PageRequest(page, size)*/);
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.GET)
	public Client getClient(@PathVariable(name="id") Long id) {
		return clientRepository.findOne(id);
	}
	
	@RequestMapping(value="/get", method=RequestMethod.GET)
	public Client getClientByName(
			@RequestParam(name="last", defaultValue="") String nom,
			@RequestParam(name="first", defaultValue="") String prenom) {
		return clientRepository.findByName(nom, prenom);
	}
	
	@RequestMapping(value="search", method=RequestMethod.GET)
	public Page<Client> searchByName(
			@RequestParam(name="keyword", defaultValue="") String keyword,
			@RequestParam(name="page", defaultValue="0") int page,
			@RequestParam(name="size", defaultValue="10") int size) {
		return clientRepository.searchByName("%"+keyword+"%", new PageRequest(page, size));
	}
	
	@RequestMapping(value="save", method=RequestMethod.POST)
	public Client save(@RequestBody Client client) {
		return clientRepository.save(client); 
	}
	
	@RequestMapping(value="update/{id}", method=RequestMethod.PUT)
	public Client update(@PathVariable(name="id") Long id, @RequestBody Client client) {
		client.setIdClient(id);
		return clientRepository.save(client); 
	}
	
	@RequestMapping(value="delete/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable(name="id") Long id) {
		clientRepository.delete(id);
	}
	
	@RequestMapping(value="bails/{id}", method=RequestMethod.GET)
	public List<Bail> getBails(@PathVariable(name="id") Long id) {
		return clientRepository.findBails(id);
	}
}
