import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  sidebarExpanded = false;
  id: string | null = null;
  museumName: string | null = null;

  event: any = {
    name: '',
    description: '',
    date: '',
    imageLink: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.firestore
        .collection('museums')
        .doc(this.id)
        .valueChanges()
        .subscribe((museumData: any) => {
          if (museumData && museumData.name) {
            this.museumName = museumData.name;
          } else {
            this.toastr.error('Museum not found. Try again.');
            this.router.navigate(['get-museums']);
          }
        });
    } else {
      this.toastr.error('Museum not found. Try again.');
      this.router.navigate(['get-museums']);
    }
  }

  createEvent() {
    if (
      !this.event.name.trim() ||
      !this.event.description.trim() ||
      !this.event.date.trim() ||
      !this.event.imageLink.trim()
    ) {
      this.toastr.warning(
        'Please fill in all fields before adding an art piece.'
      );
      return;
    }

    if (this.id) {
      this.firestore
        .collection('museums')
        .doc(this.id)
        .collection('events')
        .add(this.event)
        .then(() => {
          this.toastr.success('Event added successfully!');

          this.router.navigate(['get-museums']);
        })
        .catch((error) => {
          console.error('Error adding event: ', error);
          this.toastr.error('Failed to add event. Please try again.');
        });
    } else {
      this.toastr.error('Failed to add event. Please try again.');
    }
  }
}
