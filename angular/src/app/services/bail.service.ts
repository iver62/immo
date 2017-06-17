import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bail } from '../bail';

@Injectable()
export class BailService {
	private bailsUrl: string;
	private headers: Headers;

	constructor(private http: Http) {
		this.bailsUrl = './api/bail';  // URL to web api;
		this.headers = new Headers({'Content-Type': 'application/json'});
	}

	getBails(page: number, status: string, column: string, order: Boolean): Promise<Bail[]> {
		const url = `${this.bailsUrl}?page=${page}&status=${status}&col=${column}&ord=${order}`;
		console.log("bails");
		console.log(url);
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().content as Bail[])
			.catch(this.handleError);
	}

	getBailById(id: number): Promise<Bail> {
		const url = `${this.bailsUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Bail)
			.catch(this.handleError);
	}

/*	getCurrentBails(page: number): Promise<Bail[]> {
		const url = `${this.bailsUrl}/now?page=${page}`;
		console.log("currentBails");
		console.log(url);
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().content as Bail[])
			.catch(this.handleError);
	}*/

	getTotalPages(status: string): Promise<number> {
		const url = `${this.bailsUrl}?status=${status}`;
		console.log(url);
		return this.http.get(this.bailsUrl)
			.toPromise()
			.then(response => response.json().totalPages as number)
			.catch(this.handleError);
	}

	create(bail: Bail): Promise<Bail> {
		const body = JSON.stringify(bail);
		const url = `${this.bailsUrl}/save/`;
		return this.http.post(url, body, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bail)
			.catch(this.handleError);
	}

	update(bail: Bail): Promise<Bail> {
		const url = `${this.bailsUrl}/update/${bail.idBail}`;
		return this.http.put(url, JSON.stringify(bail), {headers: this.headers})
			.toPromise()
			.then(() => bail)
			.catch(this.handleError);
	}

	delete(bail: Bail): Promise<Bail> {
		const url = `${this.bailsUrl}/delete/${bail.idBail}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => bail)
			.catch(this.handleError);
	}

	sort(page: number, size: number, column: string, order: Boolean): Promise<Bail[]> {
		const url = `${this.bailsUrl}/sort?page=${page}&size=${size}&col=${column}&ord=${order}`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json().content as Bail[])
			.catch(this.handleError);
	}

/*	sortById(): Promise<Bail[]> {
		const url = `${this.bailsUrl}/sort/id`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bail[])
			.catch(this.handleError);
	}

	sortByIdInv(): Promise<Bail[]> {
		const url = `${this.bailsUrl}/sortInv/id`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bail[])
			.catch(this.handleError);
	}

	sortByDateFin(): Promise<Bail[]> {
		const url = `${this.bailsUrl}/sort/dateFin`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bail[])
			.catch(this.handleError);
	}

	sortByDateFinInv(): Promise<Bail[]> {
		const url = `${this.bailsUrl}/sortInv/dateFin`;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bail[])
			.catch(this.handleError);
	}*/

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
  	}
}