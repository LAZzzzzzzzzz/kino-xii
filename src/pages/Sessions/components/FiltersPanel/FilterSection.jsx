const FilterSection = ({ label, children }) => {
  return (
    <section className="flex flex-col gap-3 border-b border-raised pb-6">
      <h3 className="text-xs font-semibold tracking-overline text-secondary uppercase">
        {label}
      </h3>

      {children}
    </section>
  );
};

export default FilterSection;
