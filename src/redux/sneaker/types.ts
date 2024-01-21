export type Sneaker = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
export type FetchSneakersArg = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface SneakerSliceState {
  items: Sneaker[];
  status: Status;
}
