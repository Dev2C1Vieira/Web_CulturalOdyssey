import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  constructor(private router: Router) {}

  @Input() artId!: string;
  @Input() artName!: string;
  @Input() author!: string;
  @Input() date!: string;
  @Input() description!: string;
  @Input() imageLink!: string;
  @Input() category!: string;
  @Input() museumId!: string;

  showInfo() {
    console.log(this.museumId, this.artId);
    this.router.navigate(['show-art', this.museumId, this.artId]);
}
}
