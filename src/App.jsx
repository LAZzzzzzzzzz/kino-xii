import { Route, Routes } from 'react-router';
import { Layout } from '@/components';
import { Landing, MovieDetails, Profile } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies/:slug" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
