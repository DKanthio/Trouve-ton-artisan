import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.sass'
})


export class ServicesComponent implements OnInit {
  artisans: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadArtisans();
  }

  loadArtisans() {
    this.http.get<any[]>("http://localhost:3000/artisan").subscribe(data => {
      this.artisans = data.filter(artisan => artisan.category === 'Services');
    }, error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
  }

  showArtisanDetails(artisan: any) {
    
    
    
  }
  generateStarsArray(note: number): any[] {
    const fullStars = Math.floor(note); 
    const remaining = note - fullStars;

    const starsArray: any[] = [];

    
    for (let i = 0; i < fullStars; i++) {
        starsArray.push(1); 
    }

   
    
    const remainingStars = 5 - starsArray.length;
    for (let i = 0; i < remainingStars; i++) {
        starsArray.push(0); // Étoile vide
    }

    return starsArray;
}
}
