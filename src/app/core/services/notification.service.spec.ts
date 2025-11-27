import {TestBed} from '@angular/core/testing';
import {NotificationMessage, NotificationService} from './notification.service';

jest.useFakeTimers();

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should add a notification and remove it after the specified duration', () => {
    const notification: NotificationMessage = {
      type: 'success',
      message: 'Test success notification',
      duration: 5000,
    };

    service.show(notification);

    expect(service.notifications$()).toEqual([notification]);

    jest.advanceTimersByTime(5000);

    expect(service.notifications$()).toEqual([]);
  });

  it('should clear the previous timeout when adding a new notification', () => {
    const firstNotification: NotificationMessage = {
      type: 'info',
      message: 'First notification',
      duration: 3000,
    };

    const secondNotification: NotificationMessage = {
      type: 'info',
      message: 'Second notification',
      duration: 3000,
    };

    service.show(firstNotification);
    service.show(secondNotification);

    jest.advanceTimersByTime(3000);

    expect(service.notifications$()).toEqual([]);
  });

  it('should add success notification and remove it after default duration', () => {
    service.success('Success message');

    expect(service.notifications$()).toEqual([
      {type: 'success', message: 'Success message', duration: undefined},
    ]);

    jest.advanceTimersByTime(3000);

    expect(service.notifications$()).toEqual([]);
  });

  it('should add error notification and remove it after the specified duration', () => {
    service.error('Error message', 4000);

    expect(service.notifications$()).toEqual([
      {type: 'error', message: 'Error message', duration: 4000},
    ]);

    jest.advanceTimersByTime(4000);

    expect(service.notifications$()).toEqual([]);
  });

  it('should clear all notifications immediately when clear() is called', () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const notification: NotificationMessage = {
      type: 'warning',
      message: 'Warning notification',
    };

    service.show(notification);

    expect(service.notifications$()).toEqual([notification]);

    service.clear();

    expect(service.notifications$()).toEqual([]);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

    setTimeoutSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
    jest.useRealTimers();
  });

  it('should add info notification and keep it for the default duration', () => {
    jest.useFakeTimers();
    service.info('Info message');

    expect(service.notifications$()).toEqual([
      {type: 'info', message: 'Info message', duration: undefined},
    ]);

    jest.advanceTimersByTime(3000);

    expect(service.notifications$()).toEqual([]);
  });

  it('should add warning notification and remove it after default duration', () => {
    jest.useFakeTimers()
    service.warning('Warning message');

    expect(service.notifications$()).toEqual([
      {type: 'warning', message: 'Warning message', duration: undefined},
    ]);

    jest.advanceTimersByTime(3000);

    expect(service.notifications$()).toEqual([]);
  });
});
