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
      setJournals(response.data);
    } catch (err) {
      setError('Failed to load journals');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 animate-fade-in">
          <h2 className="text-4xl font-bold text-moss mb-3 tracking-tight">Your Journal Entries</h2>
          <p className="text-gray-600 text-lg">
            {journals.length} {journals.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sage/30 border-t-sage"></div>
            <p className="mt-4 text-sage-dark font-medium">Loading your journals...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-5 rounded-2xl border border-red-100 shadow-soft animate-slide-up">
            {error}
          </div>
        )}

        {!loading && journals.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-6">📝</div>
            <p className="text-gray-500 text-xl font-medium mb-2">No journal entries yet.</p>
            <p className="text-gray-400 text-base">Start writing your first entry!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;