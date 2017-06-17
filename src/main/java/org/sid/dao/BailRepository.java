package org.sid.dao;

import org.sid.entities.Bail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BailRepository extends JpaRepository<Bail, Long> {
	
	@Query("SELECT b FROM Bail b WHERE b.dateDebut < NOW() AND b.dateFin > NOW()")
	Page<Bail> findCurrentBails(Pageable pageable);
	
//	@Query("SELECT b FROM Bail b ORDER BY b.idBail")
//	List<Bail> orderById();
//	
//	@Query("SELECT b FROM Bail b ORDER BY b.idBail DESC")
//	List<Bail> orderByIdInv();
//	
//	@Query("SELECT b FROM Bail b ORDER BY b.dateFin")
//	List<Bail> orderByDateFin();
//	
//	@Query("SELECT b FROM Bail b ORDER BY b.dateFin DESC")
//	List<Bail> orderByDateFinInv();

}
