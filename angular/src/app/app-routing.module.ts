import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BailFormComponent } from './components/bail-form.component';
import { BailsComponent }	from './components/bails.component';
import { ClientDetailComponent } from './components/client-detail.component';
import { ClientFormComponent } from './components/client-form.component';
import { ClientsComponent }	from './components/clients.component';
import { CarouselComponent } from './components/carousel.component';
import { HouseDetailComponent } from './components/house-detail.component';
import { HouseFormComponent } from './components/house-form.component';
import { HousesComponent } from './components/houses.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home',        	  component: CarouselComponent },
	{ path: 'clients',     	  component: ClientsComponent },
	{ path: 'bails/:status',  component: BailsComponent },
 	// { path: 'houses', 		  component: HousesComponent },
	{ path: 'houses/:status', component: HousesComponent },
	{ path: 'addHouse',    	  component: HouseFormComponent },
	{ path: 'addClient',   	  component: ClientFormComponent },
	{ path: 'addBail',     	  component: BailFormComponent },
	{ path: 'house/:id',   	  component: HouseDetailComponent },
	{ path: 'client/:id',  	  component: ClientDetailComponent },
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}