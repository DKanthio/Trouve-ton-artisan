import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { BatimentComponent } from './batiment/batiment.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { ServicesComponent } from './services/services.component';
import { FabricationComponent } from './fabrication/fabrication.component';
import { ArtisanDetailComponent } from './artisan-detail/artisan-detail.component';
import { Page404Component } from './page404/page404.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    BatimentComponent,
    AlimentationComponent,
    ServicesComponent,
    FabricationComponent,
    ArtisanDetailComponent,
    Page404Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
