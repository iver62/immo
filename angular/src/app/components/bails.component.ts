import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Bail } from '../bail';
import { BailService } from '../services/bail.service';

@Component({
  selector: 'app-bails',
  templateUrl: './bails.component.html',
  styleUrls: [ './bails.component.css', './houses.component.css' ]
})
export class BailsComponent implements OnInit {
	bails: Bail[];
	private selectedBail: Bail;
	private currentPage: number;
	private totalPages: number;
	private size: number;
	private edit: Boolean;
	private statut: string;
	private column: {
		name: string,
		order: boolean
	}
	private pages: number[];
	// private idOrder: Boolean;
	// private dateFinOrder: Boolean;
	private formGroup: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private bailService: BailService,
		private formBuilder: FormBuilder
	) { 
		this.currentPage = 0;
		// this.statut = "";
		this.column = {
			name : "idBail",
			order : true
		}
		this.size = 6;
		this.edit = false;
		// this.idOrder = true;
		// this.dateFinOrder = true;
	}
  
	ngOnInit(): void {
		this.currentPage = 0;
		this.route.params
			.map((params: Params) => params['status'])
			.subscribe(statut => this.statut = statut);
		this.route.params
			.switchMap((params: Params) => this.bailService.getBails(this.currentPage, params['status'], this.column.name, true))
			.subscribe(bails => this.bails = bails);
		this.formGroup = this.formBuilder.group({
			filter: ['all']
		});
		// this.getBails();
		this.getTotalPages();
  	}

/*	getBails(column: string, order: boolean): void {
		this.bailService.getBails(this.currentPage, this.statut, column, order)
			.then(bails => this.bails = bails);
	}*/

/*	getCurrentBails(): void {
		this.bailService.getCurrentBails(this.currentPage)
			.then(bails => this.bails = bails);
	}*/

	getTotalPages(): void {
		this.bailService.getTotalPages(this.statut)
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
		this.bailService.getBails(this.currentPage, this.statut, this.column.name, this.column.order)
			.then(bails => this.bails = bails);
		// this.getBails(col, ord);
	}

	onDelete(bail: Bail): void {
		if (confirm('Etes vous sûr de vouloir supprimer?')) {
			this.bailService.delete(bail);
			alert("Bail supprimé");
			location.reload();
		}
	}

	onSelect(bail: Bail): void {
		this.edit = this.edit ? false : true;	
		/*if (this.edit) {
			this.selectedBail = bail;
			// this.bailService.update(bail);
		}
		else {
			this.selectedBail = null;
		}*/
		this.selectedBail = this.edit ? bail : null;
	}

	save(bail: Bail): void {
		this.bailService.update(bail);
		location.reload();
	}

/*	onsubmit(): void {
		console.log("submit");
		if (this.formGroup.value.filter === "now") {
			console.log("now");
			this.getCurrentBails();
		}
		else {
			console.log("all");
			this.getBails();
		}
		this.statut = this.formGroup.value.filter;
		this.getBails();
	}*/

	gotoDetail(bail: Bail): void {

	}

	sortById(): void {
		this.column.name = "idBail";
		this.bailService.getBails(this.currentPage, this.statut, this.column.name, this.column.order)
			.then(bails => this.bails = bails);
		this.column.order = this.column.order ? false : true;
		// this.dateFinOrder = true;
	}

	sortByDateFin(): void {
		this.column.name = "dateFin";
		this.bailService.getBails(this.currentPage, this.statut, this.column.name, this.column.order)
			.then(bails => this.bails = bails);
		this.column.order = this.column.order ? false : true;
		// this.dateFinOrder = this.dateFinOrder ? false : true;
		// this.idOrder = true;
	}
}