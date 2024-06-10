import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() image!: string;
  @Input() name!: string;
  @Input() product_name!: string;
  @Input() path: string | undefined;
}
