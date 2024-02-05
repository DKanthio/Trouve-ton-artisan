import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.sass'
})
export class AccueilComponent implements OnInit {
  topArtisans: any[] = [];

  constructor() { }

  async ngOnInit() {
    try {
      const response = await fetch("http://localhost:3000/artisan");
      const artisans = await response.json();
      
      
      console.log(artisans);

      
      if (Array.isArray(artisans)) {
        
        artisans.sort((a, b) => b.note - a.note);
       
        this.topArtisans = artisans.slice(0, 3);
      } else {
        console.error("Les données récupérées ne sont pas un tableau.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des artisans :", error);
    }
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