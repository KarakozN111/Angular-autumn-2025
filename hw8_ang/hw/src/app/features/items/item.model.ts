export interface Item {
  id?: number | string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;
  thumbnail?: string;
  [key: string]: any;
}
