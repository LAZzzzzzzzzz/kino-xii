import { Route, Routes } from 'react-router';
import { Layout } from '@/components';
import {
  Booking,
  CHECKOUT_STEP,
  Confirmation,
  Landing,
  MovieDetails,
  Profile,
  SEAT_STEP,
  Sessions,
} from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/movies/:slug" element={<MovieDetails />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route
          path="/sessions/:sessionId/seats"
          element={<Booking step={SEAT_STEP} />}
        />
        <Route
          path="/sessions/:sessionId/checkout"
          element={<Booking step={CHECKOUT_STEP} />}
        />
        <Route path="/orders/:reference" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
