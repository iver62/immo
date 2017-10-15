import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent }	from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BailFormComponent } from './components/bail-form.component';
import { BailsComponent }	from './components/bails.component';
import { CarouselComponent } from './components/carousel.component';
import { ClientDetailComponent } from './components/client-detail.component';
import { ClientFormComponent } from './components/client-form.component';
import { ClientsComponent }	from './components/clients.component';
import { HouseDetailComponent } from './components/house-detail.component';
import { HouseFormComponent } from './components/house-form.component';
import { HouseSearchComponent } from './components/house-search.component';
import { HousesComponent } from './components/houses.component';
import { BailService } from './services/bail.service';
import { ClientService } from './services/client.service';
import { HouseSearchService } from './services/house-search.service';
import { HouseService } from './services/house.service';


@NgModule({	
  declarations: [
    AppComponent,
    BailFormComponent,
    BailsComponent,
    CarouselComponent,
    ClientDetailComponent,
    ClientFormComponent,
    ClientsComponent,
    HousesComponent,
    HouseDetailComponent,
    HouseFormComponent,
    HouseSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    BailService,
    HouseService,
	ClientService,
    HouseSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
