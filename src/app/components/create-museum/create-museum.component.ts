import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { GeoPoint } from '@firebase/firestore';

interface VisitingHour {
  value: string;
  disabled: boolean;
}

interface ArtPiece {
  author: string;
  category: string;
  date: string;
  imageLink: string;
  artName: string;
  description: string;
}

interface Museum {
  name: string;
  about: string;
  address: string;
  imageLink: string;
  category: string;
  ticketShop: string;
  visitingHours: VisitingHour[];
  map?: [number, number];
}

@Component({
  selector: 'app-create-museum',
  templateUrl: './create-museum.component.html',
  styleUrls: ['./create-museum.component.css'],
})
export class CreateMuseumComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {}

  sidebarExpanded = true;
  museumCreated = false;
  museumId: string = '';

  museum: Museum = {
    name: '',
    about: '',
    address: '',
    imageLink: '',
    category: '',
    ticketShop: '',
    visitingHours: [],
  };

  arts: ArtPiece[] = [];

  defaultVisitingHour = '';
  defaultArt: ArtPiece = {
    author: '',
    category: '',
    date: '',
    imageLink: '',
    artName: '',
    description: '',
  };
  categories: any[] = [];

  latitude = '';
  longitude = '';

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.firestore
      .collection('categories')
      .valueChanges()
      .subscribe(
        (categories: any[]) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Error fetching categories:', error);
          this.toastr.error(
            'Failed to fetch categories. Please try again later.'
          );
        }
      );
  }

  addVisitingHour() {
    if (this.defaultVisitingHour.trim() === '') {
      this.toastr.warning('Please enter a visiting hour before adding.');
      return;
    }

    this.museum.visitingHours.push({
      value: this.defaultVisitingHour,
      disabled: false,
    });

    this.defaultVisitingHour = '';
  }

  removeVisitingHour(index: number) {
    this.museum.visitingHours.splice(index, 1);
  }

  addArt() {
    const { author, category, date, imageLink, artName, description } =
      this.defaultArt;

    if (
      !author.trim() ||
      !category.trim() ||
      !date ||
      !imageLink.trim() ||
      !artName.trim() ||
      !description.trim()
    ) {
      this.toastr.warning(
        'Please fill in all fields before adding an art piece.'
      );
      return;
    }

    this.arts.push({
      author,
      category,
      date,
      imageLink,
      artName,
      description,
    });

    this.defaultArt = {
      author: '',
      category: '',
      date: '',
      imageLink: '',
      artName: '',
      description: '',
    };
  }

  removeArt(index: number) {
    this.arts.splice(index, 1);
  }

  addArts() {
    if (this.arts.length === 0) {
      this.toastr.warning(
        'Please add at least one art piece before updating the museum.'
      );
      return;
    }

    const promises: Promise<any>[] = [];
    this.arts.forEach((artPiece: ArtPiece) => {
      promises.push(this.addArtToMuseum(artPiece));
    });

    Promise.all(promises)
      .then(() => {
        this.toastr.success('Art pieces added successfully!');
        this.museumCreated = false;
        this.clearFormData();
      })
      .catch((error) => {
        console.error('Error adding art pieces:', error);
        this.toastr.error('Failed to add art pieces. Please try again later.');
      });
  }

  addArtToMuseum(artPiece: ArtPiece): Promise<any> {
    return this.firestore
      .collection('museums')
      .doc(this.museumId)
      .collection('arts')
      .add(artPiece);
  }

  createMuseum() {
    const requiredFields = [
      'name',
      'about',
      'address',
      'imageLink',
      'ticketShop',
      'category',
      'latitude',
      'longitude',
      'visitingHours',
    ];

    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      this.toastr.warning('Invalid latitude or longitude');
      return;
    }

    this.museum.map = [lat, lng];

    this.museum.visitingHours = this.museum.visitingHours.map(
      (time: any) => time.value
    );

    this.firestore
      .collection('museums')
      .add(this.museum)
      .then((docRef) => {
        this.toastr.success('Museum created successfully!');
        this.museumCreated = true;
        this.museumId = docRef.id;
      })
      .catch((error) => {
        console.error('Error creating museum:', error);
        this.toastr.error('Failed to create museum. Please try again later.');
      });
  }

  clearFormData() {
    this.museum = {
      name: '',
      about: '',
      address: '',
      imageLink: '',
      category: '',
      ticketShop: '',
      visitingHours: [],
      map: [0, 0],
    };
    this.arts = [];
    this.latitude = '';
    this.longitude = '';
    this.defaultVisitingHour = '';
    this.defaultArt = {
      author: '',
      category: '',
      date: '',
      imageLink: '',
      artName: '',
      description: '',
    };
  }
}
