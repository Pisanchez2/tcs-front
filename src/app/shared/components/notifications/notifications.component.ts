import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: `
    <div class="notifications-container">
      @for (notification of notifications$(); track notification.message) {
        <div class="notification" [class]="'notification-' + notification.type">
          <div class="notification-content">
            <span class="notification-icon">{{ getIcon(notification.type) }}</span>
            <span class="notification-message">{{ notification.message }}</span>
          </div>
          <button class="notification-close" (click)="close()">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      font-size: 14px;
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .notification-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .notification-message {
      color: inherit;
      line-height: 1.4;
    }

    .notification-close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      margin-left: 12px;
      opacity: 0.7;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    .notification-success {
      background-color: #efe;
      border: 1px solid #cfc;
      color: #0a0;
    }

    .notification-error {
      background-color: #fee;
      border: 1px solid #fcc;
      color: #c33;
    }

    .notification-info {
      background-color: #eef;
      border: 1px solid #ccf;
      color: #33c;
    }

    .notification-warning {
      background-color: #fef3cd;
      border: 1px solid #ffc107;
      color: #cc6600;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(400px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (max-width: 480px) {
      .notifications-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }

      .notification {
        font-size: 12px;
        padding: 10px 12px;
      }

      .notification-icon {
        font-size: 16px;
      }

      .notification-close {
        font-size: 14px;
        margin-left: 8px;
      }
    }
  `]
})
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);

  readonly notifications$ = this.notificationService.notifications$;

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      case 'warning':
        return '⚠';
      default:
        return '•';
    }
  }

  close(): void {
    this.notificationService.clear();
  }
}
