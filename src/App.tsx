import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import DetailPage from './pages/DetailPage';
import FavouritesPage from './pages/FavouritesPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main role="main">
          <Routes>
            <Route index element={<ListingPage />} />
            <Route path="anime/:id" element={<DetailPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="*" element={
              <div className="p-8 text-center text-xl text-[var(--text-secondary)]">
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