import { Link } from 'react-router';
import { cn } from '@/helpers';

const SectionHeader = ({ title, seeAllTo, className, isUpperCase = true, ...rest }) => {
  return (
    <div {...rest} className={cn('flex items-end justify-between', className)}>
      <h2 className={cn("text-2xl font-extrabold", isUpperCase && 'uppercase' )}>{title}</h2>
      {seeAllTo && (
        <Link
          to={seeAllTo}
          className="text-sm font-semibold text-red transition-opacity duration-150 ease-out hover:opacity-80"
        >
          See all
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
