import { ComingSoon, Hero, NowPlaying, RecentlyViewed } from './components';

const Landing = () => {
  return (
    <>
      <Hero />
      <RecentlyViewed />
      <NowPlaying />
      <ComingSoon />
    </>
  );
};

export default Landing;
