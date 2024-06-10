import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { CreateMuseumComponent } from './components/create-museum/create-museum.component';
import { GetMuseumsComponent } from './components/get-museums/get-museums.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ShowByCategoryComponent } from './components/show-by-category/show-by-category.component';
import { MuseumComponent } from './components/museum/museum.component';
//import { BlackettVintageComponent } from './components/product/wines/museum/blackett-vintage/blackett-vintage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-museum',
    component: CreateMuseumComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'get-museums',
    component: GetMuseumsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-event/:id',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: LandingPageComponent },
  { path: 'show-by-category/:category', component: ShowByCategoryComponent },
  { path: 'museum/:id', component: MuseumComponent },
  // { path: 'wine-category-museum/museu-museum/blackett-vintage', component: BlackettVintageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
