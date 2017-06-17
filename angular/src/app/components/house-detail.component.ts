import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HouseService } from '../services/house.service';
import { House } from '../house';

@Component({
  	selector: 'app-house-detail',
  	templateUrl: './house-detail.component.html',
	styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
	house: House;
	modify: Boolean;
	
	constructor(
		private houseService: HouseService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.modify = false;
	}

	ngOnInit(): void {
	 	this.route.params
			.switchMap((params: Params) => this.houseService.getHouseById(+params['id']))
			.subscribe(house => this.house = house);
	}

	toggleModifications() {
		this.modify = this.modify ? false : true;
	}
	
	update(): void {
	  	this.houseService.update(this.house);
		this.router.navigate(['/houses', '']);
	  	this.modify = false;
//			.then(() => this.goBack());
	}

	onDelete(): void {
		if (confirm('Etes vous sûr de vouloir supprimer?')) {
			this.houseService.delete(this.house)
				.then(() => this.goBack());
			alert('Logement supprimé');;
		}
	}

	goBack(): void {
	  	this.location.back();
  	}
}