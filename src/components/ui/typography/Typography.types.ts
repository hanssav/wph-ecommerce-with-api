export const weightVariants = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
} as const;

export const sizeVariants = {
  xs: { text: 'text-xs', leading: 'leading-xs' },
  sm: { text: 'text-sm', leading: 'leading-sm' },
  md: { text: 'text-md', leading: 'leading-md' },
  lg: { text: 'text-lg', leading: 'leading-lg' },
  xl: { text: 'text-xl', leading: 'leading-xl' },
  'display-xs': { text: 'text-display-xs', leading: 'leading-display-xs' },
  'display-sm': { text: 'text-display-sm', leading: 'leading-display-sm' },
  'display-md': { text: 'text-display-md', leading: 'leading-display-md' },
  'display-lg': { text: 'text-display-lg', leading: 'leading-display-lg' },
  'display-xl': { text: 'text-display-xl', leading: 'leading-display-xl' },
  'display-2xl': { text: 'text-display-2xl', leading: 'leading-display-2xl' },
  'display-3xl': { text: 'text-display-3xl', leading: 'leading-display-3xl' },
} as const;

type FontWeight = keyof typeof weightVariants;
type TextSize = keyof typeof sizeVariants;

type ResponsiveType<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

type TypographyProps<T extends React.ElementType = 'p'> = {
  size?: TextSize | ResponsiveType<TextSize | number>;
  weight?: FontWeight | ResponsiveType<FontWeight>;
  className?: string;
  children: React.ReactNode;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export type { TypographyProps, TextSize, FontWeight, ResponsiveType };
