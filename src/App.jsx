import { Route, Routes } from 'react-router';
import { Layout } from '@/components';
import { Landing, MovieDetails, Profile, Seats, Sessions } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies/:slug" element={<MovieDetails />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/sessions/:sessionId/seats" element={<Seats />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
