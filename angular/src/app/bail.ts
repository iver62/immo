import { House } from './house';
import { Client } from './client';

export class Bail {
	idBail: number;
	logement: House;
	client: Client;
	dateDebut: Date;
	dateFin: Date;
	ajoutBail: Date;
}