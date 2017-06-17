/*package org.sid.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("maison")
public class Maison extends Logement {

	private double terrain;
	private static final long serialVersionUID = 1L;

	public Maison(String designation, double surface, int nbPieces, String adresseLogement, double loyer, String photo,
			String statut, double terrain) {
		super(designation, surface, nbPieces, adresseLogement, loyer, photo, statut);
		this.terrain = terrain;
	}

	public Maison() {
		super();
	}
	
	public double getTerrain() {
		return terrain;
	}
	
	public void setTerrain(double terrain) {
		this.terrain = terrain;
	}

}
*/