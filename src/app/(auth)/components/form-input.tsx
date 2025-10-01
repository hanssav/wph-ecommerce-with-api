import { ShowEyeType } from '../useAuthForm';
import { FieldConfig } from './field';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps } from 'react-hook-form';
import { RegisterFormData } from '@/lib/validation';

type FormInputProps = {
  fieldCfg: FieldConfig;
  field: ControllerRenderProps<RegisterFormData, keyof RegisterFormData>;
  showEye: ShowEyeType;
  setShowEye: React.Dispatch<React.SetStateAction<ShowEyeType>>;
};

export const FormInput: React.FC<FormInputProps> = ({
  fieldCfg,
  field,
  showEye,
  setShowEye,
}) => {
  const isPassword =
    fieldCfg.name === 'password' || fieldCfg.name === 'confirmPassword';

  if (isPassword && fieldCfg.eye) {
    const key = fieldCfg.name as keyof ShowEyeType;

    return (
      <Input
        {...field}
        label={fieldCfg.label}
        type={showEye[key] ? 'text' : 'password'}
        iconPosition='right'
        icon={showEye[key] ? <Eye /> : <EyeOff />}
        onIconClick={() =>
          setShowEye((prev) => ({
            ...prev,
            [key]: !prev[key],
          }))
        }
      />
    );
  }

  return <Input {...field} type={fieldCfg.type} label={fieldCfg.label} />;
};
