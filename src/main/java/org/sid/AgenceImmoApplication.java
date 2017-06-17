package org.sid;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.sid.dao.BailRepository;
import org.sid.dao.ClientRepository;
import org.sid.dao.LogementRepository;
import org.sid.entities.Bail;
import org.sid.entities.Client;
import org.sid.entities.Logement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgenceImmoApplication implements CommandLineRunner {
	
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private LogementRepository logementRepository;
	@Autowired
	private BailRepository bailRepository;

	public static void main(String[] args) {
		SpringApplication.run(AgenceImmoApplication.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		Client c1 = clientRepository.save(new Client("Martin", "Pierre", "pierre.martin@mail.com", df.parse("1980-02-10")));
		Client c2 = clientRepository.save(new Client("Durand", "Jean", "jean.durand@mail.com", df.parse("1982-02-10")));
		
		Logement l1  = logementRepository.save(new Logement("Maison ancienne", 80, 5, "Lille", 500, "maison1.jpg", "Disponible", df.parse("2016-12-10")));
		Logement l2  = logementRepository.save(new Logement("Superbe maison", 100, 6, "Roubaix", 800, "maison2.jpg", "Occupé", df.parse("2016-12-30")));
		Logement l3  = logementRepository.save(new Logement("Appartement spacieux", 150, 7, "Lille", 1000, "appartement1.jpg", "En attente", df.parse("2017-01-10")));
		Logement l4  = logementRepository.save(new Logement("Villa", 200, 10, "Seclin", 1500, "maison3.jpg", "En réparation", df.parse("2017-02-10")));
		Logement l5  = logementRepository.save(new Logement("Maison ancienne", 80, 5, "Lille", 500, "maison1.jpg", "Disponible", df.parse("2016-12-10")));
		Logement l6  = logementRepository.save(new Logement("Superbe maison", 100, 6, "Roubaix", 800, "maison2.jpg", "Occupé", df.parse("2016-12-30")));
		Logement l7  = logementRepository.save(new Logement("Appartement spacieux", 150, 7, "Lille", 1000, "appartement1.jpg", "En attente", df.parse("2017-01-10")));
		Logement l8  = logementRepository.save(new Logement("Villa", 200, 10, "Seclin", 1500, "maison3.jpg", "En réparation", df.parse("2017-02-10")));
		Logement l9  = logementRepository.save(new Logement("Maison ancienne", 80, 5, "Lille", 500, "maison1.jpg", "Disponible", df.parse("2016-12-10")));
		Logement l10 = logementRepository.save(new Logement("Superbe maison", 100, 6, "Roubaix", 800, "maison2.jpg", "Occupé", df.parse("2016-12-30")));
		Logement l11 = logementRepository.save(new Logement("Appartement spacieux", 150, 7, "Lille", 1000, "appartement1.jpg", "En attente", df.parse("2017-01-10")));
		Logement l12 = logementRepository.save(new Logement("Villa", 200, 10, "Seclin", 1500, "maison3.jpg", "En réparation", df.parse("2017-02-10")));
		Logement l13 = logementRepository.save(new Logement("Maison ancienne", 80, 5, "Lille", 500, "maison1.jpg", "Disponible", df.parse("2016-12-10")));
		Logement l14 = logementRepository.save(new Logement("Superbe maison", 100, 6, "Roubaix", 800, "maison2.jpg", "Occupé", df.parse("2016-12-30")));
		Logement l15 = logementRepository.save(new Logement("Appartement spacieux", 150, 7, "Lille", 1000, "appartement1.jpg", "En attente", df.parse("2017-01-10")));
		Logement l16 = logementRepository.save(new Logement("Villa", 200, 10, "Seclin", 1500, "maison3.jpg", "En réparation", df.parse("2017-02-10")));
		
		Bail b1 = bailRepository.save(new Bail(l1, c1, df.parse("2013-10-10"), df.parse("2016-10-10"), new Date()));
		Bail b2 = bailRepository.save(new Bail(l1, c2, df.parse("2012-10-10"), df.parse("2015-10-10"), new Date()));
		Bail b3 = bailRepository.save(new Bail(l2, c2, df.parse("2011-10-10"), df.parse("2014-10-10"), new Date()));
		Bail b4 = bailRepository.save(new Bail(l3, c2, df.parse("2014-10-10"), df.parse("2017-10-10"), new Date()));
		Bail b5 = bailRepository.save(new Bail(l4, c2, df.parse("2015-10-10"), df.parse("2018-10-10"), new Date()));
		Bail b6 = bailRepository.save(new Bail(l1, c1, df.parse("2010-10-10"), df.parse("2013-10-10"), new Date()));
		Bail b7 = bailRepository.save(new Bail(l1, c1, df.parse("2009-10-10"), df.parse("2012-10-10"), new Date()));
	}
}
