package org.sid.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class Client implements Serializable {
	
	@Id
	@GeneratedValue
	private Long idClient;
	private String nomClient;
	private String prenomClient;
	private String emailClient;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date dateNaissanceClient;

	private static final long serialVersionUID = 1L;	
	
	public Client() {
		super();
	}

	public Client(String nomClient, String prenomClient, String emailClient, Date dateNaissanceClient) {
		super();
		this.nomClient = nomClient;
		this.prenomClient = prenomClient;
		this.emailClient = emailClient;
		this.dateNaissanceClient = dateNaissanceClient;
	}

	public String getEmailClient() {
		return emailClient;
	}

	public void setEmailClient(String emailClient) {
		this.emailClient = emailClient;
	}

	public Long getIdClient() {
		return idClient;
	}

	public void setIdClient(Long idClient) {
		this.idClient = idClient;
	}

	public String getNomClient() {
		return nomClient;
	}

	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}

	public String getPrenomClient() {
		return prenomClient;
	}

	public void setPrenomClient(String prenomClient) {
		this.prenomClient = prenomClient;
	}

	public Date getDateNaissanceClient() {
		return dateNaissanceClient;
	}

	public void setDateNaissanceClient(Date dateNaissanceClient) {
		this.dateNaissanceClient = dateNaissanceClient;
	}

}
