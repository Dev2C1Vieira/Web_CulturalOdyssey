import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { WineCategoryComponent } from './components/category-page/wine-category/wine-category.component';
import { VinhoDoPortoComponent } from './components/museums/wines/vinho-do-porto/vinho-do-porto.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MuseumCardComponent } from './components/museum-card/museum-card.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { BlackettVintageComponent } from './components/product/wines/vinho-do-porto/blackett-vintage/blackett-vintage.component';
import { ProductTemplateComponent } from './components/product-template/product-template.component';
import { MuseumTemplateComponent } from './components/museum-template/museum-template.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, DashboardComponent, LandingPageComponent, FooterComponent, MuseumCardComponent, WineCategoryComponent, FooterComponent, VinhoDoPortoComponent, ProductCardComponent, BlackettVintageComponent, ProductTemplateComponent, MuseumTemplateComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true,
      progressBar: true,
    }), // ToastrModule added
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent, VinhoDoPortoComponent],
})
export class AppModule {}
