import { Component, OnInit } from '@angular/core';

import { Client } from '../client';
import { ClientService } from '../services/client.service';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: [ './clients.component.css' ]
})
export class ClientsComponent implements OnInit {
	clients: Client[];
	selectedClient: Client;
	errorMessage: string;
	
	constructor(private clientService: ClientService) { }
	
	ngOnInit(): void {
		this.getClients();
	}
	
	onSelect(client: Client): void {
		this.selectedClient = client;
		console.log(this.selectedClient);
	}
	
	getClients(): void {
		this.clientService.getClients()
			.then(
				clients => this.clients = clients,
				error =>  this.errorMessage = <any>error);
	}
}