import { NgModule } from "@angular/core";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { environment } from "../environments/environment";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { ToastrModule } from "ngx-toastr";

import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CategoryPageComponent } from "./components/category-page/category-page.component";
import { MuseumCardComponent } from "./components/museum-card/museum-card.component";
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import { HeadNavbarComponent } from "./components/head-navbar/head-navbar.component";
import { CreateMuseumComponent } from "./components/create-museum/create-museum.component";
import { GetMuseumsComponent } from "./components/get-museums/get-museums.component";
import { ImageDialogComponent } from "./components/image-dialog/image-dialog.component";
import { CreateEventComponent } from "./components/create-event/create-event.component";
import { WineCategoryComponent } from "./components/category-page/wine-category/wine-category.component";
import { VinhoDoPortoComponent } from "./components/museums/wines/vinho-do-porto/vinho-do-porto.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { BlackettVintageComponent } from "./components/product/wines/vinho-do-porto/blackett-vintage/blackett-vintage.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, DashboardComponent, LandingPageComponent, FooterComponent, CategoryPageComponent, MuseumCardComponent, SideNavbarComponent, HeadNavbarComponent, CreateMuseumComponent, GetMuseumsComponent, ImageDialogComponent, CreateEventComponent, WineCategoryComponent, VinhoDoPortoComponent, ProductCardComponent, BlackettVintageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      tapToDismiss: true,
      progressBar: true,
    }), // ToastrModule added
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
