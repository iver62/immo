package org.sid.web;

import java.util.List;

import org.sid.dao.LogementRepository;
import org.sid.entities.Logement;
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
@RequestMapping(value="api/logement")
public class LogementRestController {
	
	@Autowired
	private LogementRepository logementRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public List<Logement> all() {
		return logementRepository.findAll();
	}
	
//	@RequestMapping(value="page", method=RequestMethod.GET)
//	public Page<Logement> getLogements(
//			@RequestParam(name="page", defaultValue="0") int page,
//			@RequestParam(name="size", defaultValue="12") int size) {
//		return logementRepository.findAll(new PageRequest(page, size));
//	}
	
	@RequestMapping(value="available")
	public List<Logement> getAvailableHouses() {
		return logementRepository.findAvailableHouses();
	}
	
	@RequestMapping(value="last", method=RequestMethod.GET)
	public List<Logement> getLastLogements() {
		return logementRepository.searchLastLogements();
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.GET)
	public Logement getLogementById(@PathVariable(name="id") Long id) {
		return logementRepository.findOne(id);
	}
	
	@RequestMapping(value="get", method=RequestMethod.GET)
	public Logement getLogementByDesignation(@RequestParam(name="des", defaultValue="") String designation) {
		return logementRepository.findByDesignation(designation);
	}
	
	@RequestMapping(value="search", method=RequestMethod.GET)
	public List<Logement> searchByDesignation(
			@RequestParam(name="keyword", defaultValue="") String keyword,
			@RequestParam(name="status", defaultValue="") String status) {
//			@RequestParam(name="size", defaultValue="4") int size) {
		if ("all".equals(status)) {
			return logementRepository.findByDesignationStatus("%"+keyword+"%", "%%");
		}
		return logementRepository.findByDesignationStatus("%"+keyword+"%", "%"+status+"%");
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public Logement save(@RequestBody Logement logement) {
//		logement.setDate(new Date()); // fait côté client
		return logementRepository.save(logement); 
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.PUT)
	public Logement update(@PathVariable(name="id") Long id, @RequestBody Logement logement) {
		logement.setIdLogement(id);
		return logementRepository.save(logement); 
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable(name="id") Long id) {
		logementRepository.delete(id);
	}
	
	@RequestMapping(value="status", method=RequestMethod.GET)
	public Page<Logement> searchByStatut(
			@RequestParam(name="statut", defaultValue="all") String status,
			@RequestParam(name="page", defaultValue="0") int page,
			@RequestParam(name="size", defaultValue="16") int size) {
		if ("all".equals(status)) {
			return logementRepository.findAll(new PageRequest(page, size));
		}
		return logementRepository.findByStatut("%"+status+"%", new PageRequest(page, size));
	}

}
