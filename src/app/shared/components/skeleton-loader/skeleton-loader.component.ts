import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {
  items = input<number>(3);
  skeletonItems = computed(() => new Array(this.items()).fill(0));

  getItems(): number[] {
    return this.skeletonItems();
  }
}
