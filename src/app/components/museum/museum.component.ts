import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MuseumService } from '../../services/museum/museum.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css'],
})
export class MuseumComponent implements OnInit {
  id: string = 'clear';
  museum: any = {};
  arts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private museumService: MuseumService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id === 'clear') {
      this.toastr.error('Failed show the museum. Please try again.');
      return;
    }

    this.loadMuseumData();
    this.loadArtsData();
  }

  async loadMuseumData() {
    try {
      this.museum = await this.museumService.getMuseumData(this.id);
    } catch (error) {
      this.toastr.error('Failed show the museum. Please try again.');
    }
  }

  async loadArtsData() {
    try {
      this.museumService.getArtsData(this.id).subscribe((arts: any[]) => {
        this.arts = arts;
        console.log(`Test ${this.arts}`);
      });
    } catch (error) {
      this.toastr.error('Failed show the museum. Please try again.');
    }
  }
}
