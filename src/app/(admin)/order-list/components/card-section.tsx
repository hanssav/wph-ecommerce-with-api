import Typography from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const CardSection: React.FC<{
  label?: string;
  value?: string[];
  border?: boolean;
  className?: string;
}> = ({ label, value = [], border = true, className }) => {
  return (
    <div
      className={cn(
        'pb-4 w-full',
        border && 'border-b border-neutral-300',
        className
      )}
    >
      <Typography size={{ base: 'sm' }} weight='bold' className='lg:text-left '>
        {label}
      </Typography>

      <div className='flex flex-col gap-0.5'>
        {value.map((val, idx) => (
          <Typography
            key={idx}
            size={{ base: 'sm' }}
            weight='normal'
            className='leading-tight text-neutral-600 lg:text-left'
          >
            {val}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
