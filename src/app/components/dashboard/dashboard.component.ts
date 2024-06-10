import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';


import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayName: string = '';
  photoURL: string = '';
  birthdate: string = '';
  phoneNumber: string = '';
  location: string = '';

  sidebarExpanded = true;
  isNewUser: boolean = false;
  isGoogleProvider: boolean = false;
  showData: boolean = false;

  // Define an index signature to allow indexing with string keys
  [key: string]: any;

  constructor(
    private toastr: ToastrService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const user = await this.auth.currentUser;

      if (!user) {
        throw new Error('User not found');
      }

      const userData = await this.firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .toPromise();

      if (!userData || !userData.exists) {
        throw new Error('User data not found');
      }

      const userDoc: any = userData.data();

      if (userDoc && userDoc.firstLogin !== undefined) {
        this.isNewUser = userDoc.firstLogin;
        this.showData = this.isNewUser;
      }

      if (this.isNewUser) {
        this.isGoogleProvider = userDoc.displayName ? true : false;
        console.log(this.isGoogleProvider);
        console.log(this.isNewUser);
      }
    } catch (error) {
      console.error('Error:', error);
      this.toastr.error('Failed to fetch user data.');
    }
  }

  onSubmit() {
    const requiredFields = this.isGoogleProvider
      ? ['birthdate', 'phoneNumber', 'location']
      : ['displayName', 'photoURL', 'birthdate', 'phoneNumber', 'location'];

    const missingFields = requiredFields.filter((field) => !this[field]);
    if (missingFields.length > 0) {
      this.toastr.warning('Fill all the fields');
      return;
    }

    this.submitForm();
  }

  private async submitForm() {
    try {
      const user = await this.auth.currentUser;

      if (!user) {
        throw new Error('User not found');
      }

      const userData = {
        displayName: this.displayName,
        photoURL: this.photoURL,
        birthdate: this.birthdate,
        phoneNumber: this.phoneNumber,
        location: this.location,
        firstLogin: false,
      };

      if (this.isGoogleProvider) {
        await this.firestore.collection('users').doc(user.uid).update({
          birthdate: this.birthdate,
          phoneNumber: this.phoneNumber,
          location: this.location,
          firstLogin: false,
        });
      } else {
        await this.firestore.collection('users').doc(user.uid).update(userData);
      }
      this.isNewUser = false;
      this.cdr.detectChanges();
      this.toastr.success('Data added successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      this.toastr.error('Failed to add data.');
    }
  }
}
