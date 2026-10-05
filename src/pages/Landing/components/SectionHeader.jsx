import { Link } from 'react-router';
import { cn } from '@/helpers';

const SectionHeader = ({ title, seeAllTo, className, ...rest }) => {
  return (
    <div {...rest} className={cn('flex items-end justify-between', className)}>
      <h2 className="text-2xl font-extrabold uppercase">{title}</h2>
      <Link
        to={seeAllTo}
        className="text-sm font-semibold text-red transition-opacity duration-150 ease-out hover:opacity-80"
      >
        See all
      </Link>
    </div>
  );
};

export default SectionHeader;
