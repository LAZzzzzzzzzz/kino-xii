import { Link } from 'react-router';
import { navbarBackground } from '@/assets';
import { cn } from '@/helpers';
import Button from './Button';
import SearchBar from './SearchBar';

const Header = ({ className }) => {
  return (
    <header
      className={cn(
        'relative flex items-center justify-between px-15 pt-7.5 pb-10 font-sans tracking-normal text-primary',
        className
      )}
    >
      <img
        src={navbarBackground}
        alt="Navbar Background"
        className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
      />

      <nav className="relative flex shrink-0 items-center gap-9 whitespace-nowrap">
        <Link
          to="/"
          aria-label="Kino XII home"
          className="flex items-center gap-1.5 text-xl font-extrabold transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <span>KINO</span>
          <span className="text-red">XII</span>
        </Link>
        <Link
          to="/sessions"
          className="text-xs font-semibold tracking-overline uppercase transition-opacity duration-150 ease-out hover:opacity-80"
        >
          Sessions
        </Link>
      </nav>

      <div className="relative flex min-w-0 items-center gap-8">
        <div role="search" className="flex w-120 min-w-0 flex-col items-end">
          <SearchBar
            name="search"
            placeholder="Search films and live events"
            aria-label="Search films and live events"
          />
        </div>

        <div className="flex shrink-0 items-start gap-3">
          <Button>Sign up</Button>
          <Button variant="light">Log in</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
