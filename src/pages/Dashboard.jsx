import { useState, useEffect } from 'react';
import { journalAPI } from '../services/api';
import Navbar from '../components/Navbar';
import JournalCard from '../components/JournalCard';

const Dashboard = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await journalAPI.getAll();
      // Backend returns array directly in response.data
      setJournals(response.data);
    } catch (err) {
      setError('Failed to load journals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-moss">Your Journal Entries</h2>
          <p className="text-gray-600 mt-2">
            {journals.length} {journals.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && journals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No journal entries yet.</p>
            <p className="text-gray-400 mt-2">Start writing your first entry!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;