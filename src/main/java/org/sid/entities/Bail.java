package org.sid.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Bail implements Serializable {
	
	@Id
	@GeneratedValue
	private Long idBail;
	@ManyToOne
	@JoinColumn(name="id_logement")
	private Logement logement;
	@ManyToOne
	@JoinColumn(name="id_client")
	private Client client;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dateDebut;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dateFin;
	private Date ajoutBail;
	private static final long serialVersionUID = 1L;
	
	public Bail() {
		super();
	}
	
	public Bail(Logement logement, Client client, Date dateDebut, Date dateFin, Date ajoutBail) {
		super();
		this.logement = logement;
		this.client = client;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.ajoutBail = ajoutBail;
	}
	
	public Long getIdBail() {
		return idBail;
	}
	
	public void setIdBail(Long idBail) {
		this.idBail = idBail;
	}
	
	public Logement getLogement() {
		return logement;
	}
	
	public void setLogement(Logement logement) {
		this.logement = logement;
	}
	
	public Client getClient() {
		return client;
	}
	
	public void setClient(Client client) {
		this.client = client;
	}
	
	public Date getDateDebut() {
		return dateDebut;
	}
	
	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}
	
	public Date getDateFin() {
		return dateFin;
	}
	
	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public Date getAjoutBail() {
		return ajoutBail;
	}

	public void setAjoutBail(Date ajoutBail) {
		this.ajoutBail = ajoutBail;
	}
	
}
