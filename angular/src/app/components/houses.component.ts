import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { House } from '../house';
import { HouseService } from '../services/house.service';

@Component({
	selector: 'app-houses',
	templateUrl: './houses.component.html',
	styleUrls: [ './houses.component.css' ]
})
export class HousesComponent implements OnInit {
	houses: House[];
	errorMessage: string;
	selectedHouse: House;
	totalPages: number;
	currentPage: number;
	pages: number[];
	formGroup: FormGroup;
	statut: string;
	size: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private houseService: HouseService,
		private formBuilder: FormBuilder
	) { 
		// this.currentPage = 0;
		// this.statut = "";
		this.size = 16;
	}
	
	ngOnInit(): void {
		console.log("init");
		this.currentPage = 0;
		this.route.params
			.map((params: Params) => params['status'])
			.subscribe(statut => this.statut = statut);
		this.route.params
			.switchMap((params: Params) => this.houseService.searchByStatus(this.statut, this.currentPage, this.size))
			.subscribe(houses => this.houses = houses);
		// this.getHouses();
		this.getTotalPages();
		this.formGroup = this.formBuilder.group({
			// statut: [''],
			size: []
		});
		// this.getPages();
	}
	
	onSelect(house: House): void {
		this.selectedHouse = house;
		console.log(this.selectedHouse);
	}
	
	getHouses(): void {
		this.houseService.searchByStatus(this.statut, this.currentPage, this.size)
			.then(houses => this.houses = houses);
		// this.currentPage = 0;
		this.getTotalPages();
	}

	getTotalPages(): void {
		this.houseService.getTotalPages(this.statut, this.size)
			.then(totalPages => this.totalPages = totalPages)
			.then(pages => this.pages = this.getPages());
	}

	getPages(): number[] {
		const tab = []
		for (let i = 0; i < this.totalPages; i++) {
			tab[i] = i;
		}
		return tab;
	}

	gotoPage(p: number): void {
		this.currentPage = p;
		this.getHouses();
	}
  
	gotoDetail(): void {
		this.router.navigate(['/house', this.selectedHouse.idLogement]);
	}

	onSubmit(): void {
		// this.houseService.searchByStatus(this.formGroup.value.statut, this.currentPage)
		// 	.then(houses => this.houses = houses)
		this.currentPage = 0;
		// this.statut = this.formGroup.value.statut;
		this.size = +this.formGroup.value.size;
		console.log(this.size);
		this.getHouses();
		// this.getTotalPages(this.formGroup.value.statut);
	}
}