import { useRecentlyViewed } from './useRecentlyViewed';
import RecentlyViewedCard from './RecentlyViewedCard';
import SectionHeader from '../SectionHeader';

const RecentlyViewed = () => {
  const movies = useRecentlyViewed();

  if (!movies.length) {
    return null;
  }

  return (
    <section
      aria-label="Recently viewed"
      className="px-17.5 pt-10"
    >
      <SectionHeader title="Recently viewed" isUpperCase={false}/>

      <div className="relative overflow-hidden mb-10 mt-5">
        <div className="scrollbar-none flex gap-5 overflow-x-auto">
          {movies.map((movie) => (
            <RecentlyViewedCard key={movie.id ?? movie.slug} movie={movie} />
          ))}
        </div>

        <div className="pointer-events-none absolute -inset-y-14.75 -right-68.75 w-87 bg-page blur-fade" />
      </div>

      <hr className="mb-10 border-t border-tint-white" />
    </section>
  );
};

export default RecentlyViewed;
