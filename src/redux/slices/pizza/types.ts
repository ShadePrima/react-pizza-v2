export type FetchPizzasArgs = Record<string, string>;

export type Pizza = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
