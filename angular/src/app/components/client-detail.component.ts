import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Bail } from '../bail';
import { Client } from '../client';
import { ClientService } from '../services/client.service';

@Component({
	selector: 'app-client-detail',
	templateUrl: 'client-detail.component.html',
})
export class ClientDetailComponent implements OnInit {
	client: Client;
	bails: Bail[];

	constructor(
		private clientService: ClientService,
		private route: ActivatedRoute,
		private location: Location
	) {	}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.clientService.getClientById(+params['id']))
			.subscribe(client => this.client = client);
		this.route.params
			.switchMap((params: Params) => this.clientService.getBails(+params['id']))
			.subscribe(bails => this.bails = bails);
	}

	goBack(): void {
		console.log(this.client);
    	this.location.back();
  }
}