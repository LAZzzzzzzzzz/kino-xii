import { Route, Routes } from 'react-router';
import { Layout } from '@/components';
import { Landing, MovieDetails } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies/:slug" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
