import {mapFormValuesToProduct} from './product.utils';
import {IProduct} from '../../core/models/product.model';

describe('transformAndTrimFormValue', () => {
    it('should trim string values in the formValue and keep non-string values as is', () => {
        const formValue = {
            id: ' 123 ',
            name: '  Product Name  ',
            description: '  Sample description  ',
            logo: '  logo.png ',
            date_release: '2023-10-01 ',
            date_revision: ' 2023-11-01'
        };

        const expected: IProduct = {
            id: '123',
            name: 'Product Name',
            description: 'Sample description',
            logo: 'logo.png',
            date_release: '2023-10-01',
            date_revision: '2023-11-01'
        };

        const result = mapFormValuesToProduct(formValue);
        expect(result).toEqual(expected);
    });

    it('should replace undefined values with an empty string', () => {
        const formValue = {
            id: undefined,
            name: 'Product Name',
            description: undefined,
            logo: null,
            date_release: undefined,
            date_revision: undefined
        };

        const expected: IProduct = {
            id: '',
            name: 'Product Name',
            description: '',
            logo: '',
            date_release: '',
            date_revision: ''
        };

        const result = mapFormValuesToProduct(formValue);
        expect(result).toEqual(expected);
    });

    it('should handle an empty object gracefully', () => {
        const formValue = {};
        const expected: IProduct = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: '',
            date_revision: ''
        };

        const result = mapFormValuesToProduct(formValue);
        expect(result).toEqual(expected);
    });

});
