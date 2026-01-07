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
      <div className="min-h-screen bg-gradient-soft">
        <Navbar />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sage/30 border-t-sage"></div>
          <p className="mt-4 text-sage-dark font-medium">Loading journal...</p>
        </div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-red-50 text-red-600 p-5 rounded-2xl border border-red-100 shadow-soft">
            {error || 'Journal not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-large p-10 animate-scale-in border border-sage/10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl font-bold text-moss mb-4 tracking-tight leading-tight">{journal.title}</h1>
              <p className="text-gray-500 text-sm font-medium">
                Created: {formatDate(journal.createdAt)}
              </p>
              {journal.updatedAt !== journal.createdAt && (
                <p className="text-gray-400 text-sm font-medium mt-1">
                  Last edited: {formatDate(journal.updatedAt)}
                </p>
              )}
            </div>
          </div>

          <div className="prose max-w-none mb-10">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {journal.content}
            </p>
          </div>

          <div className="flex space-x-4 pt-8 border-t-2 border-gray-100">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:shadow-soft transition-all duration-300 font-bold"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="px-8 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-medium transition-all duration-300 font-bold hover:scale-105 transform"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-8 py-3 bg-terracotta text-white rounded-xl hover:bg-terracotta-dark hover:shadow-medium transition-all duration-300 font-bold hover:scale-105 transform"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-large animate-scale-in border border-sage/10">
            <h3 className="text-2xl font-bold text-moss mb-4">Delete Journal Entry?</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Are you sure you want to delete this entry? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 hover:shadow-medium transition-all duration-300 font-bold"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-bold"
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