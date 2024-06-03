export interface BaseItem {
  id: number;
  created_at: Date;
}

export interface Product extends BaseItem {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  quantity?: number;
}

export interface User extends BaseItem {
  email: string;
  password: string;
  name?: string;
}

export interface OrderedItem extends BaseItem {
  quantity: number;
  price: number;

  order_id: number;
  product_id: number;
  product_name: string;
}

export interface Order extends BaseItem {
  total: number;

  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  status: string;
  user: string;
  orderedItems: OrderedItem[];
}

export interface FeatureItem extends BaseItem {
  isFeatured: boolean;
  isBestSeller: boolean;
}

export interface CartItem extends BaseItem {
  quantity: number;
  price: number;
  user_id: number;
  product_id: number;
}
