import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface UserData {
  photoURL: string;
  displayName: string;
  // Add any other fields you expect in your user document
}

@Component({
  selector: 'app-head-navbar',
  templateUrl: './head-navbar.component.html',
  styleUrls: ['./head-navbar.component.css'],
})
export class HeadNavbarComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {}

  userName: string = 'Nome do Usuário';
  userImageUrl: string = 'https://via.placeholder.com/40';
  iconDrop: string = 'fas fa-chevron-down';

  showSettingsMenu: boolean = false;

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this.toastr.success('Logged out successfully!');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
   

    if (this.iconDrop === 'fas fa-chevron-up') {
      this.iconDrop = 'fas fa-chevron-down';
    } else {
      this.iconDrop = 'fas fa-chevron-up';
    }
  }

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData() {
    const user = await this.auth.currentUser;
  
    if (!user) {
      throw new Error('User not found');
    }
    this.userName = user.displayName || 'John Doe';
    this.userImageUrl = user.photoURL || 'https://via.placeholder.com/40';
  }
}
