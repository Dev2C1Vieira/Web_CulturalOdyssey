import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async googleAuth() {
    try {
      const result = await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider().setCustomParameters({
          prompt: 'select_account',
        })
      );
      const user = result.user;

      if (user) {
        if (result.additionalUserInfo?.isNewUser) {
          await this.saveUserData(user);
          this.toastr.success('Account created with success! Welcome :)');
          this.router.navigate(['/']);
        } else {
          const userDoc = await this.firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .toPromise();
        
          const isAdmin = userDoc?.get('isAdmin');
          this.toastr.success('Login with successful!');
          if (isAdmin) {
            // User is admin, redirect to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }
      }
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  }

  async registerWithEmailPassword(email: string, password: string) {
    try {
      const credential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = credential.user;

      if (user) {
        if (credential.additionalUserInfo?.isNewUser) {
          await this.saveUserData(user);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  private async saveUserData(user: firebase.User) {
    try {
      await this.firestore.collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        firstLogin: false,
        isAdmin: false,
      });
      console.log('User data saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  }
}
