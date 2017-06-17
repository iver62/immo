package org.sid.dao;

import java.util.List;

import org.sid.entities.Logement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LogementRepository extends JpaRepository<Logement, Long> {
	
//	public Page<Logement> findAll(Pageable pageable);
	
	@Query("SELECT l FROM Logement l WHERE l.designation LIKE :x AND l.statut LIKE :y")
	List<Logement> findByDesignationStatus(@Param("x")String keyword, @Param("y") String status);

//	@Query("SELECT l FROM Logement l WHERE l.date > :x")
//	public Page<Logement> searchByDate(@Param("x")String keyword, Pageable pageable);

	@Query("SELECT l FROM Logement l ORDER BY l.date DESC")
	List<Logement> searchLastLogements();

	Logement findByDesignation(String designation);

	@Query("SELECT l FROM Logement l WHERE l.statut LIKE :x")
	Page<Logement> findByStatut(@Param("x")String statut, Pageable pageable);

	@Query("SELECT l FROM Logement l WHERE l.statut != 'En réparation'")
	List<Logement> findAvailableHouses();
}
