import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanServices } from '../artisan/artisan.service'; 
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import MailDev from 'maildev'; 


@Component({
  selector: 'app-artisan-detail',
  templateUrl: './artisan-detail.component.html',
  styleUrl: './artisan-detail.component.sass'
})

export class ArtisanDetailComponent implements OnInit {
  artisan: any;
  emailSent: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private ArtisanServices: ArtisanServices,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const artisanIdParam = this.route.snapshot.paramMap.get('id');
    if (artisanIdParam !== null) {
      const artisanId = +artisanIdParam;
      const allArtisans = this.ArtisanServices.getProducts();
      this.artisan = allArtisans.find(artisan => +artisan.id === artisanId);
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
      starsArray.push(0);
    }

    return starsArray;
  }

  sendEmail(event: Event): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string ?? '';
    const subject = formData.get('subject') as string ?? '';
    const message = formData.get('message') as string ?? '';
    const emailBody = `Nom : ${name}\n\nObjet : ${subject}\n\nMessage : ${message}`;
    const emailData = {
        email: this.artisan.email,
        subject: subject,
        message: emailBody,
        name:name
    };

    // Envoi de l'e-mail via MailDev
    this.http.post('http://localhost:3001/send', emailData)
        .pipe(
            catchError(error => {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
                this.errorMessage = 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.';
                return throwError(error);
            })
        )
        .subscribe(response => {
            console.log('E-mail envoyé avec succès :', response);
            this.emailSent = true;
            this.successMessage = 'L\'e-mail a été envoyé à MailDev';
        });
}

}