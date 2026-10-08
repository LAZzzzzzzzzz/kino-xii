const DetailField = ({ label, value }) => {
  return (
    <div className="flex w-full flex-col gap-1.75 overflow-clip">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="text-sm font-semibold wrap-break-word">{value}</p>
    </div>
  );
};

export default DetailField;
