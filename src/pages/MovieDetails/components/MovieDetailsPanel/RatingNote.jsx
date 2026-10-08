const RatingNote = ({ ageRating }) => {
  return (
    <div className="flex w-full flex-col gap-1.75 overflow-clip rounded-xl bg-tint-orange px-3.25 py-2.25 text-orange">
      <p className="text-xs font-semibold">RATING NOTE</p>

      <div className="flex gap-1.75">
        <p className="text-xs font-semibold whitespace-nowrap">
          {ageRating.code}
        </p>
        <p className="flex-1 text-xs leading-body">{ageRating.description}</p>
      </div>
    </div>
  );
};

export default RatingNote;
