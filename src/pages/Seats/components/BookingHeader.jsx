const BookingHeader = ({ title, summary }) => {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-xl font-extrabold uppercase">{title}</h1>
      <p className="text-xs leading-body text-secondary">{summary}</p>
    </header>
  );
};

export default BookingHeader;
