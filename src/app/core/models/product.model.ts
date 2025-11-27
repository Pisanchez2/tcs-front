export interface IProduct {
  id: string,
  name: string,
  description: string
  logo: string,
  date_release: string,
  date_revision: string
}

export interface IProductUpdate{
  message: string,
  data: Partial<IProduct>
}

