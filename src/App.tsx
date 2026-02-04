import { Routes, Route } from 'react-router-dom'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </div>
  )
}

export default App