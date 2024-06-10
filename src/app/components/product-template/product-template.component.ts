import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrl: './product-template.component.css'
})
export class ProductTemplateComponent {
  @Input() imageLink!: string;
  @Input() imageAlt!: string;
  @Input() productName!: string;
  @Input() titleAuthor!: string;
  @Input() author!: string;
  @Input() titleDate!: string;
  @Input() date!: string;
  @Input() titleCategory!: string;
  @Input() category!: string;
  @Input() titleDescription!: string;
  @Input() startDescription!: string;
  @Input() productNameCaps!: string;
  @Input() endDescription!: string;
}
