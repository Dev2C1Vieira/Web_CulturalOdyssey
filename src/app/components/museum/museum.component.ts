import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css'],
})
export class MuseumComponent {
  id: string = 'clear';
  museum: any = {};
  aboutText: string[] = [];
  goto: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public sanitizer: DomSanitizer // Change sanitizer to public
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.id === 'clear') {
      console.log('try again');
      return;
    }

    try {
      const museumDoc: any = this.firestore
        .collection('museums')
        .doc(this.id)
        .get();
      museumDoc.subscribe((snapshot: any) => {
        if (snapshot.exists) {
          this.museum = snapshot.data();

          this.goto = `https://www.google.com/maps/search/?api=1&query=${this.museum.map[0]},${this.museum.map[1]}`;
        } else {
          console.log('Museum not found');
        }
      });
    } catch (error) {
      console.error('Error fetching museum data:', error);
    }
  }
  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };
}
