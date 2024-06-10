import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private firestore: AngularFirestore) {}

  categories: any[] = [];

  ngOnInit(): void {
    this.firestore
      .collection('categories')
      .valueChanges()
      .subscribe((categories: any[]) => {
        this.categories = categories;
      });
  }
}
