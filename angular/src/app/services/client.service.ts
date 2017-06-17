import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Client } from '../client';
import { Bail } from '../bail';

@Injectable()
export class ClientService {
	private clientsUrl: string;
	private headers: Headers;

	constructor(private http: Http) {
		this.clientsUrl = './api/client';  // URL to web api
		this.headers = new Headers({ 'Content-Type': 'application/json' });
	}
  
  	getClients(): Promise<Client[]> {
		return this.http.get(this.clientsUrl)
			.toPromise()
			.then(response => response.json() as Client[])
			.catch(this.handleError);
	}
  
	getClientById(id: number): Promise<Client> {
		const url = `${this.clientsUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
	}

/*  	getClientByName(nom: string, prenom: string): Promise<Client> {
		const url = `${this.clientsUrl}/get?last=${nom}&first=${prenom}`;
		console.log(url);
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
  	}*/

	getBails(id: number): Promise<Bail[]> {
		const url = `${this.clientsUrl}/bails/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Bail[])
			.catch(this.handleError);
	}

  	create(client: Client): Promise<Client> {
		const body = JSON.stringify(client);            
		const url = `${this.clientsUrl}/save`;
		return this.http.post(url, body, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
	}

  	delete(id: number): Promise<Client> {
		const url = `${this.clientsUrl}/delete/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
	}
  
 	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
  	}
}
