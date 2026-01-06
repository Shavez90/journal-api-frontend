import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { journalAPI } from '../services/api';
import Navbar from '../components/Navbar';

const ViewJournal = () => {
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    try {
      const response = await journalAPI.getById(id);
      setJournal(response.data);
    } catch (err) {
      setError('Failed to load journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await journalAPI.delete(id);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete journal entry');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage"></div>
        </div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error || 'Journal not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-moss mb-2">{journal.title}</h1>
              <p className="text-gray-500 text-sm">
                Created: {formatDate(journal.createdAt)}
              </p>
              {journal.updatedAt !== journal.createdAt && (
                <p className="text-gray-400 text-sm">
                  Last edited: {formatDate(journal.updatedAt)}
                </p>
              )}
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {journal.content}
            </p>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="px-6 py-2 bg-sage text-white rounded-lg hover:bg-moss transition"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/80 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-moss mb-4">Delete Journal Entry?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJournal;