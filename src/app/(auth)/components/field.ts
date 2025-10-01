export type FieldConfig = {
  name: 'name' | 'phone' | 'email' | 'password' | 'confirmPassword';
  placeholder: string;
  type: string;
  eye?: boolean;
  label?: string;
};

export const fields: FieldConfig[] = [
  { name: 'name', placeholder: 'name', label: 'Name', type: 'text' },
  { name: 'phone', placeholder: 'phone', label: 'Phone', type: 'text' },
  { name: 'email', placeholder: 'email', label: 'Email', type: 'email' },
  {
    name: 'password',
    placeholder: 'password',
    label: 'Password',
    type: 'password',
    eye: true,
  },
  {
    name: 'confirmPassword',
    placeholder: 'confirm password',
    label: 'Confirm Password',
    type: 'password',
    eye: true,
  },
];
