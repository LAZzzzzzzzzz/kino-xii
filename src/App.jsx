import { Route, Routes } from 'react-router';
import { Layout } from '@/components';
import { Landing } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Layout>
  );
}

export default App;
