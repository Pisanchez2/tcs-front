import {IProduct} from '../../core/models/product.model';

export const transformAndTrimFormValue = (formValue: any): IProduct => {
  const transformed: any = {};

  Object.keys(formValue).forEach(key => {
    const value = formValue[key];
    transformed[key] = typeof value === 'string' ? value.trim() : value;
    transformed[key] = transformed[key] ?? "";
  });

  return transformed as IProduct;
}
