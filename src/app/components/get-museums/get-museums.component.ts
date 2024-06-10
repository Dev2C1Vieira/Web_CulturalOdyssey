import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-museums',
  templateUrl: './get-museums.component.html',
  styleUrls: ['./get-museums.component.css'],
})
export class GetMuseumsComponent implements AfterViewInit {
  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private router: Router
  ) {}

  sidebarExpanded = true;
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'imageLink',
    'eventPlus',
  ];
  dataSource = new MatTableDataSource<Mouseum>();
  filterData: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.fetchMuseums();
  }

  fetchMuseums() {
    this.firestore
      .collection('museums')
      .snapshotChanges()
      .subscribe((museums: any[]) => {
        const simplifiedMuseums = museums.map((museum) => ({
          id: museum.payload.doc.id, // Accessing the document ID
          ...museum.payload.doc.data(), // Accessing the document data
        }));
        this.dataSource.data = simplifiedMuseums;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onInputChange(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openImageDialog(imageUrl: string) {
    this.dialog.open(ImageDialogComponent, {
      data: {
        imageUrl: imageUrl,
      },
    });
  }

  redirectToDetailsPage(uuid: string) {
    console.log(uuid);
  }

  createEvent(id: string) {
    this.router.navigate(['create-event', id]);
  }
}

export interface Mouseum {
  id: string;
  name: string;
  category: number;
  imageLink: string;
}
