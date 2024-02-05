import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent} from'./accueil/accueil.component';
import { AlimentationComponent} from'./alimentation/alimentation.component';
import { BatimentComponent} from './batiment/batiment.component';
import { ServicesComponent}from'./services/services.component';
import { FabricationComponent } from './fabrication/fabrication.component';
import { ArtisanDetailComponent } from './artisan-detail/artisan-detail.component';
import { Page404Component} from './page404/page404.component';

const routes: Routes = [
  {path:'', component: AccueilComponent},
  {path:'alimentation' , component: AlimentationComponent},
  {path:'fabrication',component: FabricationComponent},
  {path:'bâtiment' , component: BatimentComponent},
  {path:'services', component: ServicesComponent},
  { path: 'artisan/:id', component: ArtisanDetailComponent },
  { path: '**', component: Page404Component }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
