import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root',
})
export class MuseumService {
  constructor(private firestore: AngularFirestore) {}

  async getMuseumData(id: string) {
    try {
      const museumDoc = await this.firestore
        .collection('museums')
        .doc(id)
        .get()
        .toPromise();
      if (museumDoc && museumDoc.exists) {
        // Check if museumDoc is defined and document exists
        return museumDoc.data();
      } else {
        throw new Error('Museum document not found');
      }
    } catch (error) {
      console.error('Error fetching museum data:', error);
      throw error; // Throw error for handling in the component
    }
  }

  getArtsData(id: string) {
    // Remove async here, returning Observable
    return this.firestore
      .collection(`museums/${id}/arts`)
      .snapshotChanges()
      .pipe(
        map((arts: any) => {
          return arts.map((art: any) => {
            const data = art.payload.doc.data();
            const docId = art.payload.doc.id;
            return { id: docId, museumId: id, ...data };
          });
        })
      );
  }
}
