import { cn } from '@/helpers';

const CalendarIcon = ({ className, ...rest }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
      className={cn('shrink-0', className)}
    >
      <g
        transform="translate(1.5 1.5)"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.1 1.70015H2.9C1.57452 1.70015 0.5 2.77466 0.5 4.10015V10.1001C0.5 11.4256 1.57452 12.5001 2.9 12.5001H10.1C11.4255 12.5001 12.5 11.4256 12.5 10.1001V4.10015C12.5 2.77466 11.4255 1.70015 10.1 1.70015Z" />
        <path d="M4.1 0.5V2.9M8.9 0.5V2.9M0.5 5.3H12.5" />
      </g>
    </svg>
  );
};

export default CalendarIcon;
