const HOME = '/home';

const USER = {
  ORDER: '/user/order',
};

const CHECKOUT = {
  SUCCESS: '/checkout/success',
  FAILED: '/checkout/failed',
  MAIN: '/checkout',
};

const OPEN_STORE = {
  SUCCESS: '/open-store/success',
  FAILED: '/open-store/failed',
  MAIN: '/open-store',
};

const HIDDEN_FOOTER = [
  USER.ORDER,
  CHECKOUT.FAILED,
  CHECKOUT.SUCCESS,
  OPEN_STORE.SUCCESS,
  OPEN_STORE.FAILED,
];

const DASHBOARD = '/dashboard';

const STORE = '/store';

const AUTH = {
  LOGIN: '/login',
  REGISTER: '/register',
};

const CATALOG = '/catalog';
const CART = '/cart';
const PRODUCT_DETAIL = '/detail';

export const PATH = {
  HIDDEN_FOOTER,
  USER,
  CHECKOUT,
  OPEN_STORE,
  HOME,
  DASHBOARD,
  STORE,
  AUTH,
  CATALOG,
  CART,
  PRODUCT_DETAIL,
};
