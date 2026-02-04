// src/App.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from './api/animeApi';
import './index.css';

const fetchTestAnime = async () => {
  const response = await api.get('/anime', {
    params: { q: 'naruto', limit: 5, page: 1 },
  });
  return response.data.data;
};

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test-anime'],
    queryFn: fetchTestAnime,
  });

  if (isLoading) return <div className="p-8 text-center">Loading test data...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-electric-blue mb-6">
        First Jikan API Test
      </h1>
      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default App;