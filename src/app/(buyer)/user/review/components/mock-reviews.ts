import { IMAGES } from '@/constants';

type Product = {
  name: string;
  image: string;
  qty: number;
  price: number;
};

export type Review = {
  storeName: string;
  invoice: string;
  date: string;
  product: Product;
  rating: number;
  review: string;
};

export const mockReviews: Review[] = [
  {
    storeName: 'Toko Barokah Jaya',
    invoice: 'INV12345567890',
    date: '22 Sept 2025, 17:22',
    product: {
      name: 'Sneakers Court Minimalis',
      image: IMAGES.MOCK_PRODUCT_IMAGE,
      qty: 1,
      price: 100000,
    },
    rating: 5,
    review:
      'Lorem ipsum dolor sit amet consectetur. Ullamcorper tellus quam congue id. At neque massa ultrices ultrices nulla aliquet.',
  },
  {
    storeName: 'Urban Step',
    invoice: 'INV12345567891',
    date: '21 Sept 2025, 15:48',
    product: {
      name: 'Running Shoes XZ Pro',
      image: IMAGES.MOCK_PRODUCT_IMAGE,
      qty: 1,
      price: 850000,
    },
    rating: 4,
    review:
      'Nyaman dipakai dan ringan banget, tapi bagian sol sedikit keras waktu awal.',
  },
  {
    storeName: 'SneakHub',
    invoice: 'INV12345567892',
    date: '20 Sept 2025, 10:15',
    product: {
      name: 'Classic White Canvas',
      image: IMAGES.MOCK_PRODUCT_IMAGE,
      qty: 2,
      price: 220000,
    },
    rating: 5,
    review:
      'Desain simpel tapi elegan. Cocok buat dipakai sehari-hari, ukurannya pas banget.',
  },
  {
    storeName: 'StepForward',
    invoice: 'INV12345567893',
    date: '19 Sept 2025, 09:35',
    product: {
      name: 'Sporty High Cut',
      image: IMAGES.MOCK_PRODUCT_IMAGE,
      qty: 1,
      price: 475000,
    },
    rating: 3,
    review:
      'Modelnya keren tapi agak kaku di bagian pergelangan kaki. Semoga nanti lebih lentur.',
  },
  {
    storeName: 'FootWave',
    invoice: 'INV12345567894',
    date: '18 Sept 2025, 20:10',
    product: {
      name: 'Comfort Slip-On',
      image: IMAGES.MOCK_PRODUCT_IMAGE,
      qty: 1,
      price: 299000,
    },
    rating: 4,
    review:
      'Ringan dan empuk banget, enak buat jalan santai. Warna aslinya sama kayak foto.',
  },
];
