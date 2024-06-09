import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-museum-card',
  templateUrl: './museum-card.component.html',
  styleUrls: ['./museum-card.component.css']
})

export class MuseumCardComponent {
  @Input() image!: string;
  @Input() name!: string;
  @Input() location!: string;
  @Input() path: string | undefined;
}
