import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { House } from '../house';

@Injectable()
export class HouseService {
	private housesUrl: string;
	private headers: Headers;
	
	constructor(private http: Http) {
		this.housesUrl = './api/logement';
		this.headers = new Headers({'Content-Type': 'application/json'});
	}
	
/*	getAll(): Promise<House[]> {
		return this.http.get(this.housesUrl)
			.toPromise()
			.then(response => response.json() as House[])
			.catch(this.handleError);
	}*/
	
	getAvailableHouses(): Promise<House[]> {
		const url = `${this.housesUrl}/available`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as House[])
			.catch(this.handleError);
	}

/*	getHouses(page: number): Promise<House[]> {
		const url = `${this.housesUrl}/search?page=${page}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().content as House[])
			.catch(this.handleError);
	}*/

	getLast(): Promise<House[]> {
		const url = `${this.housesUrl}/last`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as House[])
			.catch(this.handleError);
	}
	
	getHouseById(id: number): Promise<House> {
		const url = `${this.housesUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as House)
			.catch(this.handleError);
	}

	getTotalPages(statut: string, size: number): Promise<number> {
		const url = `${this.housesUrl}/status?statut=${statut}&size=${size}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().totalPages as number)
			.catch(this.handleError);
	}
	
	update(house: House): Promise<House> {
		const url = `${this.housesUrl}/update/${house.idLogement}`;
		return this.http.put(url, JSON.stringify(house), {headers: this.headers})
			.toPromise()
			.then(() => house)
			.catch(this.handleError);
	}

	create(house: House): Promise<House> {
		const body = JSON.stringify(house);
		const url = `${this.housesUrl}/save/`;
		return this.http.post(url, body, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as House)
			.catch(this.handleError);
	}

	delete(house: House): Promise<House> {
		const url = `${this.housesUrl}/delete/${house.idLogement}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => house)
			.catch(this.handleError);
	}

	searchByStatus(status: string, page: number, size: number): Promise<House[]> {
		const url = `${this.housesUrl}/status?statut=${status}&page=${page}&size=${size}`;
		console.log(url);
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().content as House[])
			.catch(this.handleError);
	}

/*	search(term: string): Observable<House> {
		console.log('search service', term);
		return this.http
			.get('/api/Company/Search/?search=' + term)
			.map(response => response.json().data as House)
			.catch(this.handleError);
	}*/
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
