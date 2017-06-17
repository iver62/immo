import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HouseSearchService } from '../services/house-search.service';
import { House } from '../house';

@Component({
	selector: 'app-house-search',
	templateUrl: './house-search.component.html',
	styleUrls: [ './house-search.component.css' ],
	providers: [ HouseSearchService ]
})
export class HouseSearchComponent implements OnInit {
	houses: Observable<House[]>;
	private searchTerms = new Subject<string>();
	private status: string;

	constructor(
		private houseSearchService: HouseSearchService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
	this.route.params
		.map((params: Params) => params['status'])
		.subscribe(statut => this.status = statut);
	this.houses = this.searchTerms
	  	.debounceTime(300)        // wait 300ms after each keystroke before considering the term
	  	.distinctUntilChanged()   // ignore if next search term is same as previous
	  	.switchMap(term => term   // switch to new observable each time the term changes
			// return the http search observable
			? this.houseSearchService.search(term, this.status)
			// or the observable of empty heroes if there was no search term
			: Observable.of<House[]>([]))
		.catch(error => {
			// TODO: add real error handling
			console.log(error);
			return Observable.of<House[]>([]);
		});
  	}

  	gotoDetail(house: House): void {
		const link = [ '/house', house.idLogement ];
		this.router.navigate(link);
  	}
}