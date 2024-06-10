import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css']
})
export class FrontNavbarComponent implements OnInit {
  logoUrl: string = '../../../assets/logo/logo-branco.png';
  userImageUrl: string = 'https://via.placeholder.com/40';
  userName: string = 'Pedro Vieira';
  showDropdown: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.displayName || 'Usuário';
        this.userImageUrl = user.photoURL || 'https://via.placeholder.com/40';
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  navigateToSettings() {
    // Lógica para navegar para a página de configurações
    console.log('Navigating to settings');
  }

  logout() {
    this.auth.signOut().then(() => {
      this.isLoggedIn = false; // Atualiza o estado da navbar
      this.router.navigate(['']); // Redireciona para a landing page
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
