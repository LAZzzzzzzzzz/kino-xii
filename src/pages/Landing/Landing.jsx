import { ComingSoon, Hero, NowPlaying, RecentlyViewed } from './components';
import { useRecentlyViewed } from './components/RecentlyViewed/useRecentlyViewed';

const Landing = () => {
  const movies = useRecentlyViewed();

  return (
    <>
      <Hero />
      <RecentlyViewed movies={movies} />
      <NowPlaying hasMargin={!movies.length} />
      <ComingSoon />
    </>
  );
};

export default Landing;
