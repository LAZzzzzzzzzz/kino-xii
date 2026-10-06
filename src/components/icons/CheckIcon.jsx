import { cn } from '@/helpers';

const CheckIcon = ({ className, ...rest }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
      className={cn('shrink-0', className)}
    >
      <path
        d="M1.5 6.3L4.35 9.15L10.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
