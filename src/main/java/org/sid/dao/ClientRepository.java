package org.sid.dao;

import java.util.List;

import org.sid.entities.Bail;
import org.sid.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClientRepository extends JpaRepository<Client, Long> {
	
//	@Query("SELECT c FROM Client c ORDER BY c.nomClient")
//	public List<Client> findAll();
//	public Page<Client> findAll(Pageable pageable);
	
	@Query("SELECT c FROM Client c WHERE c.nomClient LIKE :x")
	Page<Client> searchByName(@Param("x")String keyword, Pageable pageable);
	
	@Query("SELECT c FROM Client c WHERE c.nomClient LIKE :x AND c.prenomClient LIKE :y")
	Client findByName(@Param("x")String nom, @Param("y")String prenom);
	
	@Query("SELECT b FROM Bail b WHERE b.client.idClient = :x")
	List<Bail> findBails(@Param("x")Long id);
}