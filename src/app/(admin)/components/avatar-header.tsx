import { ICONS } from '@/constants';
import Image from 'next/image';

const AvatarHeader: React.FC<{ src?: string; name?: string }> = ({
  src = ICONS.DEFAULT_AVATAR,
  name = 'user-avatar',
}) => {
  return (
    <div className='relative h-10 w-10 overflow-hidden rounded-full'>
      <Image
        src={src}
        alt={name}
        fill
        priority
        sizes='40px'
        className='object-cover'
        unoptimized
      />
    </div>
  );
};

export default AvatarHeader;
