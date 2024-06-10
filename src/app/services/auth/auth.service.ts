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
          await this.saveUserData(user, true);
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
            const firstLogin = userDoc?.get('firstLogin');

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
          await this.saveUserData(user, false);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmailPassword(email: string, password: string) {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = credential.user;

      if (user) {
        const userDoc = await this.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .toPromise();
        const isAdmin = userDoc?.get('isAdmin');

        if (isAdmin) {
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.success('Login successful!');
          this.router.navigate(['/']);
        }
      }
    } catch (error) {
      console.error('Error during email/password authentication:', error);
      // You can handle error messages here and show them to the user using ToastrService or any other method
    }
  }

  private async saveUserData(user: firebase.User, isGoogleAuth: boolean) {
    try {
      let userData: any = {
        uid: user.uid,
        email: user.email,
        firstLogin: true,
        isAdmin: false,
      };

      if (isGoogleAuth) {
        userData.displayName = user.displayName;
        userData.photoURL = user.photoURL;
      }

      await this.firestore.collection('users').doc(user.uid).set(userData);
      console.log('User data saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  }
}
