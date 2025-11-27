import {ErrorHandlerService} from './error-handler.service';
import {ERROR_MESSAGES} from '../../shared/constants/app.constants';

describe('ErrorHandlerService', () => {
    let service: ErrorHandlerService;

    beforeEach(() => {
        service = new ErrorHandlerService();
    });

    describe('setError', () => {
        it('should set an error message', () => {
            const testMessage = 'Test error message';
            service.setError(testMessage);

            expect(service['errorMessageSignal']()).toBe(testMessage);
        });
    });

    describe('clearError', () => {
        it('should clear the error message', () => {
            service.setError('Test error message');
            service.clearError();

            expect(service['errorMessageSignal']()).toBeNull();
        });
    });

    describe('getErrorMessage', () => {
        it('should return the error.message if present', () => {
            const error = {message: 'Test error message'};
            expect(service.getErrorMessage(error)).toBe('Test error message');
        });

        it('should return error.error.message if present', () => {
            const error = {error: {message: 'Nested error message'}};
            expect(service.getErrorMessage(error)).toBe('Nested error message');
        });

        it('should return NETWORK_ERROR for status 0', () => {
            const error = {status: 0};
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.NETWORK_ERROR);
        });

        it('should return NOT_FOUND for status 404', () => {
            const error = {status: 404};
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.NOT_FOUND);
        });

        it('should return BAD_REQUEST for status 400', () => {
            const error = {status: 400};
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.BAD_REQUEST);
        });

        it('should return CONFLICT for status 409', () => {
            const error = {status: 409};
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.CONFLICT);
        });

        it('should return SERVER_ERROR for status >= 500', () => {
            const error = {status: 500};
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.SERVER_ERROR);
        });

        it('should return UNKNOWN_ERROR if no specific error matches', () => {
            const error = {status: 418}; // Example: Status not mapped
            expect(service.getErrorMessage(error)).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
        });
    });
});
