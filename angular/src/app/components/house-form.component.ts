import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { House } from '../house';
import { HouseService } from '../services/house.service';

import { Validators } from './validators';

@Component({
	selector: 'app-house-form',
	templateUrl: './house-form.component.html',
	styleUrls: [ './house-form.component.css' ]
})
export class HouseFormComponent implements OnInit {
	formGroupHouse: FormGroup;
	house: House;
	filename: string;

	constructor(
		private formBuilder: FormBuilder,
		private houseService: HouseService,
		private router: Router
	) { }

	ngOnInit() {
		this.formGroupHouse = this.formBuilder.group({
			designation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
			surface: ['', Validators.required],
			nbPieces: ['', Validators.required],
			adresse: ['', [Validators.required, Validators.maxLength(256)]],
			loyer: ['', Validators.required],
			photo: [''],
			statut: ['', Validators.required]
		});
	}
  
	onHouseSubmit(): void {
		if (this.formGroupHouse.valid) {
			this.house = new House();
			this.house.designation = this.formGroupHouse.value.designation;
			this.house.surface = this.formGroupHouse.value.surface;
			this.house.nbPieces = this.formGroupHouse.value.nbPieces;
			this.house.adresse = this.formGroupHouse.value.adresse;
			this.house.loyer = this.formGroupHouse.value.loyer;
			this.house.photo = this.filename;
			this.house.statut = this.formGroupHouse.value.statut;
			this.house.date = new Date();
			this.houseService.create(this.house);
			alert("Logement ajouté");
			location.reload();
		}
	}

	onChange(event) {
		this.filename = event.srcElement.files[0].name;
	}
}