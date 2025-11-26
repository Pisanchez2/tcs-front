import { Component, computed, inject, signal, output } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-product-delete-modal',
  standalone: true,
  templateUrl: './product-delete-modal.component.html',
  styleUrl: './product-delete-modal.component.scss'
})
export class ProductDeleteModalComponent {
  private readonly modalService = inject(ModalService);
  message = signal<string>('');
  confirmed = output<void>();

  isOpen = computed(() => this.modalService.isOpenDelete());
  product = computed(() => this.modalService.productToDelete());

  onConfirm(): void {
    this.modalService.acceptDelete();

    this.confirmed.emit();
  }

  onCancel(): void {
    this.modalService.cancelDelete();
  }
}
