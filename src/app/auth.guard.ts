import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.afAuth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.firestore
              .collection('users')
              .doc(user.uid)
              .get()
              .toPromise()
              .then((userDoc) => {
                const isAdmin = userDoc?.get('isAdmin');
                if (isAdmin) {
                  observer.next(true);
                } else {
                  this.router.navigate(['/login']);
                  observer.next(false);
                }
              })
              .catch((error) => {
                console.error('Error retrieving user data:', error);
                this.router.navigate(['/login']);
                observer.next(false);
              });
          } else {
            this.router.navigate(['/login']);
            observer.next(false);
          }
          // Return an observable to satisfy the switchMap operator
          return new Observable<boolean>(); // or of(false), depending on your needs
        })
      ).subscribe();
    });
  }
}