import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Bail } from '../bail';
import { Client } from '../client';
import { House } from '../house';
import { BailService } from '../services/bail.service';
import { ClientService } from '../services/client.service';
import { HouseService } from '../services/house.service';

import { Validators } from './validators';

@Component({
	selector: 'app-bail-form',
	templateUrl: './bail-form.component.html',
	styleUrls: [ './bail-form.component.css' ]
})
export class BailFormComponent implements OnInit {
	formGroupBail: FormGroup;
	houses: House[];
	clients: Client[];
	selectedClient: Client;
	selectedHouse: House;

	constructor(
		private formBuilder: FormBuilder,
		private bailService: BailService,
		private clientService: ClientService,
		private houseService: HouseService,
		private router: Router
	) { }

	ngOnInit() {
		this.getClients();
		this.getHouses();
		this.formGroupBail = this.formBuilder.group({
			house: ['', Validators.required],
			client: ['', Validators.required],
			dateDebut: ['', Validators.required],
			dateFin: ['', Validators.required]
		});
	}
	
	onBailSubmit(): void {
		if (this.formGroupBail.value.dateDebut > this.formGroupBail.value.dateFin) {
			alert("Erreur: dates incorrectes");
		}
		else if (this.formGroupBail.valid) {
			const bail = new Bail();
			bail.logement = this.selectedHouse;
			bail.logement.statut = "Occupé";
			bail.client = this.selectedClient;
			bail.dateDebut = this.formGroupBail.value.dateDebut;
			bail.dateFin = this.formGroupBail.value.dateFin;
			bail.ajoutBail = new Date();
			this.bailService.create(bail);
			console.log(this.selectedHouse);
			console.log(this.selectedClient);
			alert("bail ajouté");
			location.reload();
		}
	}

	getClients(): void {
		this.clientService.getClients()
			.then(clients => this.clients = clients);
	}

	getHouses(): void {
		this.houseService.getAvailableHouses()
			.then(houses => this.houses = houses);
	}
}