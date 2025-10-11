import Typography from '@/components/ui/typography';

const Subtitle: React.FC<{ totalProduct: number }> = ({ totalProduct }) => {
  return (
    <Typography as='p' weight={'normal'} size={{ base: 'xs', lg: 'md' }}>
      Showing {totalProduct} products
    </Typography>
  );
};

export default Subtitle;
