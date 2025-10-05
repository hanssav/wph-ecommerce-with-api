import { IMAGES } from './assets';

export const NOTIFICATION = {
  CHECKOUT_SUCCESS: {
    src: IMAGES.CHECKOUT_SUCCESS,
    title: 'Order Placed Successfully!',
    subtitle:
      'We’ve received your order and will notify you once it’s shipped.',
    btnLabel: 'Go to My Orders',
    btnActionSrc: '/order',
  },
  CHECKOUT_FAILED: {
    src: IMAGES.CHECKOUT_FAILED,
    title: 'Oops, something went wrong',
    subtitle:
      'Something went wrong during checkout. Please review your details and retry.',
    btnLabel: 'Back to Home',
    btnActionSrc: '/',
  },
};
