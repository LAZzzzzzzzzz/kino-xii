import { Link } from 'react-router';
import Button from '../Button';

const SearchEmptyState = ({ icon, title, description, onSelect }) => {
  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-7 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-tint-white text-primary">
        {icon}
      </span>

      <p className="mt-5 text-sm font-semibold">{title}</p>
      <p className="mt-1.5 text-sm leading-body text-secondary">
        {description}
      </p>

      <Button
        as={Link}
        to="/sessions"
        variant="secondary"
        onClick={onSelect}
        className="mt-5.5"
      >
        Browse all sessions
      </Button>
    </div>
  );
};

export default SearchEmptyState;
