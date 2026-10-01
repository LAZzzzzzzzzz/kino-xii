import { cn } from '@/helpers';

const Footer = ({ className }) => {
  return (
    <footer
      className={cn(
        'flex flex-col gap-5 bg-page px-8.5 pt-6.75 pb-8.5 font-sans tracking-normal',
        className
      )}
    >
      <div className="h-px w-full bg-raised" />

      <div className="flex w-full items-center justify-between gap-2.5 whitespace-nowrap">
        <p className="flex items-start gap-1 text-sm font-extrabold text-primary">
          <span>KINO</span>
          <span className="text-red">XII</span>
        </p>
        <p className="text-xs leading-body text-secondary">
          © 2026 Kino XII. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
