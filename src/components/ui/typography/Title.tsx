import React from 'react';
import Typography from './Typography';

const TypographyTitle: React.FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return (
    <Typography
      as={'h2'}
      weight={'bold'}
      size={{ base: 'display-xs', lg: 'display-md' }}
      className={className}
    >
      {label}
    </Typography>
  );
};

export default TypographyTitle;
