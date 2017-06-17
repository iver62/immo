import { Component, OnInit } from '@angular/core';

import { House } from '../house';
import { HouseService } from '../services/house.service';

@Component({
	selector: 'app-home',
	templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit {
	private nextPhotoInterval: number;
 	private loopSlides = true;
	private houses: House[];
	
	constructor(private houseService: HouseService) {
		this.nextPhotoInterval = 5000;
		this.loopSlides = true;
	 }
	
	ngOnInit(): void {
		this.getLastHouses();
	}

	getLastHouses(): void {
		this.houseService.getLast()
			.then(houses => this.houses = houses.slice(0, 5));
	}

	showHouses(): void {
		console.log(this.houses);
	}

}
