import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

// Lazy load route components for code splitting
const ListingPage = lazy(() => import('./pages/ListingPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main role="main">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
              <LoadingSpinner />
            </div>
          }>
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
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;