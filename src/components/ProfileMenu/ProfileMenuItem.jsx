import { Link } from 'react-router';
import { cn } from '@/helpers';
import { DropdownMenuItem } from '../ui';

const ProfileMenuItem = ({ icon, to, className, children, ...rest }) => {
  const itemClassName = cn(
    'flex h-10 w-full items-center gap-2 rounded-menu py-2.5 pl-5 text-sm font-semibold transition-colors duration-150 ease-out hover:bg-tint-white',
    className
  );

  if (to) {
    return (
      <DropdownMenuItem asChild {...rest}>
        <Link to={to} className={itemClassName}>
          {icon}
          {children}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem {...rest} className={itemClassName}>
      {icon}
      {children}
    </DropdownMenuItem>
  );
};

export default ProfileMenuItem;
