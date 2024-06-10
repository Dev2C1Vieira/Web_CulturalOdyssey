import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WineCategoryComponent } from './components/category-page/wine-category/wine-category.component';
import { VinhoDoPortoComponent } from './components/museums/wines/vinho-do-porto/vinho-do-porto.component';
import { BlackettVintageComponent } from './components/product/wines/vinho-do-porto/blackett-vintage/blackett-vintage.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: LandingPageComponent },
  { path: 'wine-category-museum', component: WineCategoryComponent },
  { path: 'wine-category-museum/museu-vinho-do-porto', component: VinhoDoPortoComponent },
  { path: 'wine-category-museum/museu-vinho-do-porto/blackett-vintage', component: BlackettVintageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
