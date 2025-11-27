import {IProduct} from '../../core/models/product.model';

export const mapFormValuesToProduct = (formValue: any): IProduct => {
  const transformed: any = {};

  Object.keys(formValue).forEach(key => {
    const value = formValue[key];
    transformed[key] = typeof value === 'string' ? value.trim() : value;
    transformed[key] = transformed[key] ?? "";
  });

  if(Object.keys(transformed).length === 0){
    return {
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: ''
    }
  }

  return transformed as IProduct;
}
