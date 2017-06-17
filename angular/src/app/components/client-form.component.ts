import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Client } from '../client';
import { ClientService } from '../services/client.service';

import { Validators } from './validators';

@Component({
	selector: 'app-client-form',
	templateUrl: './client-form.component.html',
	styleUrls: [ './client-form.component.css' ]
})

export class ClientFormComponent implements OnInit {
		formGroupClient: FormGroup;
		client: Client;

	constructor(
		private formBuilder: FormBuilder,
		private clientService: ClientService,
		private router: Router
	) { }

	ngOnInit() {
		this.formGroupClient = this.formBuilder.group({
			nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
			prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
			email: ['', [Validators.required, Validators.isValidMailFormat] ],
			date: ['', Validators.required]
		});
	}
	
	onClientSubmit(): void {
		// console.log(this.formGroupClient.value);
		if (this.formGroupClient.valid) {
			this.client = new Client();
			this.client.nomClient = this.formGroupClient.value.nom;
			this.client.prenomClient = this.formGroupClient.value.prenom;
			this.client.emailClient = this.formGroupClient.value.email;
			this.client.dateNaissanceClient = this.formGroupClient.value.date;
			// console.log("client: " + this.client.nomClient);
			this.clientService.create(this.client);
			// this.router.navigateByUrl('/clients');
			alert("Client ajouté");
			location.reload();
		}
	}
}