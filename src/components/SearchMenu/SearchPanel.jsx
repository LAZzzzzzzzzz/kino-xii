import { cn } from '@/helpers';

const SearchPanel = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        'absolute top-full right-0 z-20 mt-1.25 flex w-120 flex-col rounded-2xl border border-raised bg-page p-2 shadow-panel',
        className
      )}
    />
  );
};

export default SearchPanel;
