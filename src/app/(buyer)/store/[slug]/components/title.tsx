import Typography from '@/components/ui/typography';

export const StoreTitle: React.FC<{ className?: string }> = ({ className }) => (
  <Typography
    weight={'bold'}
    size={{ base: 'display-xs', lg: 'display-md' }}
    className={className}
  >
    Products
  </Typography>
);
