//  POST

type AddCartData = {
  id: number;
  cartId: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
};

type AddCartApiResponse = {
  success: boolean;
  message: string;
  data: AddCartData;
};

// GET

type CartResponse = {
  success: boolean;
  message: string;
  data: CartData;
};

type CartData = {
  cartId: number;
  items: CartItem[];
  groups: CartGroup[];
  grandTotal: number;
};

type CartItem = {
  id: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  product: CartProduct;
};

type CartProduct = {
  id: number;
  title: string;
  price: number;
  images: string[];
  isActive: boolean;
  stock: number;
  shop: Shop;
};

type Shop = {
  id: number;
  name: string;
  slug: string;
};

type CartGroup = {
  shop: Shop;
  items: CartGroupItem[];
  subtotal: number;
};

type CartGroupItem = {
  id: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  product: CartGroupProduct;
};

type CartGroupProduct = {
  id: number;
  title: string;
  images: string[];
  price: number;
  isActive: boolean;
  stock: number;
};

export type { AddCartApiResponse, AddCartData, CartResponse };
