const ExpiryNotice = ({ children }) => {
  return (
    <p
      role="alert"
      className="flex w-full overflow-clip rounded-xl bg-tint-red px-3.25 py-2.25 text-xs leading-body font-semibold text-red"
    >
      {children}
    </p>
  );
};

export default ExpiryNotice;
