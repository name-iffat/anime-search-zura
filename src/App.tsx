import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <main role="main">
          <Routes>
            <Route index element={<ListingPage />} />
            <Route path="anime/:id" element={<DetailPage />} />
            <Route path="*" element={
              <div className="p-8 text-center text-xl text-gray-600">
                404 - Page Not Found
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;