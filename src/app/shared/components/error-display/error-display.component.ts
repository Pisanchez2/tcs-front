import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-display',
  standalone: true,
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent {
  message = input<string | null>(null);
  closed = output<void>();

  onClose(): void {
    this.closed.emit();
  }
}
