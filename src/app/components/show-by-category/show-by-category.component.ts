import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-show-by-category',
  templateUrl: './show-by-category.component.html',
  styleUrl: './show-by-category.component.css',
})
export class ShowByCategoryComponent {
  category: string | null = '';
  museums: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');

    if (this.category) {
      this.firestore
        .collection('museums')
        .snapshotChanges()
        .subscribe((museumsSnapshot: any[]) => {
          this.museums = museumsSnapshot
            .map((museumDoc: any) => {
              const data = museumDoc.payload.doc.data();
              const id = museumDoc.payload.doc.id;
              return { id, ...data };
            })
            .filter((museum: any) => {
              console.log(
                `Museum category ${museum.category} | Category ${this.category}`
              );
              return museum.category == this.category;
            });

          //console.table(this.museums);
        });
    }
  }
}
