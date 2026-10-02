import { Route, Routes } from 'react-router';
import './App.css';
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
