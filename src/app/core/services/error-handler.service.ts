import {Injectable, signal} from '@angular/core';
import {ERROR_MESSAGES} from '../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly errorMessageSignal = signal<string | null>(null);
  readonly error$ = this.errorMessageSignal.asReadonly();

  setError(message: string): void {
    this.errorMessageSignal.set(message);
  }

  clearError(): void {
    this.errorMessageSignal.set(null);
  }

  getErrorMessage(error: any): string {

    const validationErrors = error?.error?.errors ?? error?.errors;

    if (Array.isArray(validationErrors) && validationErrors.length > 0) {
      const firstError = validationErrors[0];

      if (firstError?.constraints) {
        const firstConstraintMessage = Object.values(firstError.constraints)[0];
        if (firstConstraintMessage) {
          return String(firstConstraintMessage);
        }
      }
    }

    if (error?.error?.message) {
      return error.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    if (error?.status === 0) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (error?.status === 404) {
      return ERROR_MESSAGES.NOT_FOUND;
    }
    if (error?.status === 400) {
      return ERROR_MESSAGES.BAD_REQUEST;
    }
    if (error?.status === 409) {
      return ERROR_MESSAGES.CONFLICT;
    }
    if (error?.status >= 500) {
      return ERROR_MESSAGES.SERVER_ERROR;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}
