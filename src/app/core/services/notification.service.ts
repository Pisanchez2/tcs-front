import { Injectable, signal } from '@angular/core';

export interface NotificationMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationsSignal = signal<NotificationMessage[]>([]);
  readonly notifications$ = this.notificationsSignal.asReadonly();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(notification: NotificationMessage): void {
    const id = notification.duration || 3000;

    this.notificationsSignal.update((notifications) => [
      ...notifications,
      notification
    ]);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.notificationsSignal.update((notifications) =>
        notifications.filter((n) => n.message !== notification.message)
      );
    }, id);
  }

  success(message: string, duration?: number): void {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration?: number): void {
    this.show({ type: 'error', message, duration });
  }

  info(message: string, duration?: number): void {
    this.show({ type: 'info', message, duration });
  }

  warning(message: string, duration?: number): void {
    this.show({ type: 'warning', message, duration });
  }

  clear(): void {
    this.notificationsSignal.set([]);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
