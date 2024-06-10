import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // Import map operator

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
})
export class ArtComponent {
  museumId: string = 'clear';
  artId: string = 'clear';

  art: any = {};

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.museumId = this.route.snapshot.paramMap.get('museumId')!;
    this.artId = this.route.snapshot.paramMap.get('id')!;

    if (this.museumId === 'clear' || this.artId === 'clear') {
      console.log('try again');
      return;
    }

    this.fetchArtData();
  }

  private fetchArtData(): void {
    this.firestore
      .collection(`museums/${this.museumId}/arts`)
      .doc(this.artId)
      .valueChanges()
      .subscribe((art: any) => {
        this.art = art;
      });
  }
}
