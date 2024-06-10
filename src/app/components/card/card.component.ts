import { Component, Input } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private firestore: AngularFirestore, private router: Router) {}
  @Input() image!: string;
  @Input() name!: string;
  @Input() category!: string;
  @Input() signal!: boolean;
  @Input() address: string | boolean = false;
  @Input() museumId!: string;

  navigate() {
    if (this.signal) {
      this.router.navigate(['show-by-category', this.category]);
    } else {
      //go to museumn data page
      this.router.navigate(['museum', this.museumId]);
    }
  }
}
