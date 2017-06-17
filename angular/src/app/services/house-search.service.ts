import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { House } from '../house';

@Injectable()
export class HouseSearchService {

  	constructor(private http: Http) {}

	search(term: string, status: string): Observable<House[]> {
		const url = `./api/logement/search?keyword=${term}&status=${status}`;
		console.log(url);
		return this.http.get(url)
			.map(response => response.json() as House[]);
  	}
}