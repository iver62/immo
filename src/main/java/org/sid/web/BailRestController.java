package org.sid.web;

import org.sid.dao.BailRepository;
import org.sid.entities.Bail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/bail")
public class BailRestController {

	@Autowired
	private BailRepository bailRepository;

	@RequestMapping(method=RequestMethod.GET)
	public Page<Bail> getBails(
			@RequestParam(name="page", defaultValue="0") int page,
			@RequestParam(name="size", defaultValue="6") int size,
			@RequestParam(name="status", defaultValue="") String status,
			@RequestParam(name="col", defaultValue="idBail") String column,
			@RequestParam(name="ord", defaultValue="true") Boolean order) {
		PageRequest pr = order ? new PageRequest(page, size, Direction.ASC, column) : new PageRequest(page, size, Sort.Direction.DESC, column);
		if (status.equals("now")) {
			return bailRepository.findCurrentBails(pr);
		}
		return bailRepository.findAll(pr);
	}

	@RequestMapping(value="{id}", method=RequestMethod.GET)
	public Bail getBail(@PathVariable(name="id") Long id) {
		return bailRepository.findOne(id);
	}

//	@RequestMapping(value="now", method=RequestMethod.GET)
//	public Page<Bail> getNow(
//			@RequestParam(name="page", defaultValue="0") int page,
//			@RequestParam(name="size", defaultValue="6") int size) {
//		return bailRepository.findCurrentBails(new PageRequest(page, size));
//	}

	@RequestMapping(method=RequestMethod.POST)
	public Bail save(@RequestBody Bail bail) {
		bail.getLogement().setStatut("Occupé");
		return bailRepository.save(bail); 
	}

	@RequestMapping(value="{id}", method=RequestMethod.PUT)
	public Bail update(@PathVariable(name="id") Long id, @RequestBody Bail bail) {
		bail.setIdBail(id);
		return bailRepository.save(bail); 
	}

	@RequestMapping(value="{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable(name="id") Long id) {
		bailRepository.delete(id);; 
	}

//	@RequestMapping(value="sort")
//	public Page<Bail> sort(
//			@RequestParam(name="page", defaultValue="0") int page,
//			@RequestParam(name="size", defaultValue="6") int size,
//			@RequestParam(name="col", defaultValue="idBail") String column,
//			@RequestParam(name="ord", defaultValue="true") Boolean order) {
//		PageRequest pr = order ? new PageRequest(page, size, Direction.ASC, column) : new PageRequest(page, size, Sort.Direction.DESC, column);
//		return bailRepository.findAll(pr);
//	}

//	@RequestMapping(value="sort/id")
//	public List<Bail> sortById() {
//		return bailRepository.orderById();
//	}

//	@RequestMapping(value="sortInv/id")
//	public List<Bail> sortByIdInv() {
//		return bailRepository.orderByIdInv();
//	}

//	@RequestMapping(value="sort/dateFin")
//	public List<Bail> sortByDateFin() {
//		return bailRepository.orderByDateFin();
//	}

//	@RequestMapping(value="sortInv/dateFin")
//	public List<Bail> sortByDateFinInv() {
//		return bailRepository.orderByDateFinInv();
//	}
}
