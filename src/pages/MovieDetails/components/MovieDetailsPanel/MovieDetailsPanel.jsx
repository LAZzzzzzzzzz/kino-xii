import DetailField from './DetailField';
import RatingNote from './RatingNote';
import { getDetailFields } from './helpers';

const MovieDetailsPanel = ({ movie }) => {
  return (
    <aside
      aria-label="Film details"
      className="flex w-110.25 shrink-0 flex-col gap-4.25 self-stretch rounded-card px-6.5"
    >
      <h2 className="text-xl font-extrabold">Details</h2>

      {getDetailFields(movie).map((field) => (
        <DetailField
          key={field.label}
          label={field.label}
          value={field.value}
        />
      ))}

      <RatingNote ageRating={movie.ageRating} />
    </aside>
  );
};

export default MovieDetailsPanel;
