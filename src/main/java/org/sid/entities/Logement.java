package org.sid.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
/*@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE", discriminatorType=DiscriminatorType.STRING)*/
public /*abstract*/ class Logement implements Serializable {

	@Id
	@GeneratedValue
	private Long idLogement;
	private String designation;
	private double surface;
	private int nbPieces;
	private String adresse;
	private double loyer;
	private String photo;
	private String statut;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date date;
	private static final long serialVersionUID = 1L;
	
	public Logement() {
		super();
	}

	public Logement(String designation, double surface, int nbPieces, String adresse, double loyer,
			String photo, String statut, Date date) {
		super();
		this.designation = designation;
		this.surface = surface;
		this.nbPieces = nbPieces;
		this.adresse = adresse;
		this.loyer = loyer;
		this.photo = photo;
		this.statut = statut;
		this.date = date;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public double getLoyer() {
		return loyer;
	}

	public void setLoyer(double loyer) {
		this.loyer = loyer;
	}

	public int getNbPieces() {
		return nbPieces;
	}

	public void setNbPieces(int nbPieces) {
		this.nbPieces = nbPieces;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Long getIdLogement() {
		return idLogement;
	}

	public void setIdLogement(Long idLogement) {
		this.idLogement = idLogement;
	}

	public double getSurface() {
		return surface;
	}

	public void setSurface(double surface) {
		this.surface = surface;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
