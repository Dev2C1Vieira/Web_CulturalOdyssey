import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async googleAuth() {
    try {
      const result = await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider().setCustomParameters({
          prompt: 'select_account',
        })
      );
      const user = result.user;

      if (user && result.additionalUserInfo?.isNewUser) {
        await this.saveUserData(user);
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
        console.log(user);

        console.log('User registered successfully');
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
        // Add any other user data you want to save
      });
      console.log('User data saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  }
}
