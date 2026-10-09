const TicketField = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold tracking-overline text-secondary uppercase">
        {label}
      </span>
      <p className="text-base leading-normal font-bold whitespace-nowrap">
        {children}
      </p>
    </div>
  );
};

export default TicketField;
