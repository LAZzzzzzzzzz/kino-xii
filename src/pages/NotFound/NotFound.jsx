import { Link } from 'react-router';
import { Button } from '@/components';

const NotFound = () => {
  return (
    <section
      aria-label="Page not found"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-12.75 text-center"
    >
      <p className="text-xs font-semibold tracking-overline text-secondary uppercase">
        Error 404
      </p>

      <h1 className="text-display font-extrabold">Page not found</h1>

      <p className="text-sm leading-body text-secondary">
        The page you are looking for does not exist or has moved.
      </p>

      <Button as={Link} to="/" className="mt-2">
        Back to home
      </Button>
    </section>
  );
};

export default NotFound;
