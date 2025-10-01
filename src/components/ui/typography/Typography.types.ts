import type { ElementType } from 'react';

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
};

type FontWeight = keyof typeof weightVariants;

type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'display-xs'
  | 'display-sm'
  | 'display-md'
  | 'display-lg'
  | 'display-xl'
  | 'display-2xl'
  | 'display-3xl';

type ResponsiveType = {
  base?: TextSize;
  sm?: TextSize;
  md?: TextSize;
  lg?: TextSize;
  xl?: TextSize;
};

type TypographyProps<T extends ElementType = 'p'> = {
  size?: TextSize | ResponsiveType;
  weight?: FontWeight;
  className?: string;
  children: React.ReactNode;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

type TitleProps = { children: React.ReactNode } & TypographyProps;

type SubtitleProps = {
  children: React.ReactNode;
  className?: string;
} & TypographyProps;

export type {
  TypographyProps,
  TextSize,
  FontWeight,
  TitleProps,
  SubtitleProps,
};
