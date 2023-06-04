import { Component, Input } from '@angular/core';

import { Product } from '../product.interface';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() product!: Product;
  showDescription = false;
}
