import { cn } from '@/helpers';

const Avatar = ({ src, initials, isProfileComplete, className }) => {
  return (
    <div
      className={cn(
        'relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-card',
        className
      )}
    >
      {src && (
        <img src={src} alt="" className="size-full rounded-lg object-cover" />
      )}
      {!src && <span className="text-xs font-semibold">{initials}</span>}

      <span
        className={cn(
          'absolute right-0 bottom-0 size-2 rounded-full border border-page',
          isProfileComplete ? 'bg-green' : 'bg-orange'
        )}
      />
    </div>
  );
};

export default Avatar;
