const RestrictionNotice = ({ children }) => {
  return (
    <p className="flex w-full overflow-clip rounded-xl bg-tint-orange px-3.25 py-2.25 text-xs leading-body font-semibold text-orange">
      {children}
    </p>
  );
};

export default RestrictionNotice;
