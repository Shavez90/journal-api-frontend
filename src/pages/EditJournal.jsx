import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { journalAPI } from '../services/api';
import Navbar from '../components/Navbar';

const EditJournal = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchJournal();
  }, [id]);

  const fetchJournal = async () => {
    try {
      const response = await journalAPI.getById(id);
      // Backend returns journal object directly in response.data
      const journal = response.data;
      setFormData({ title: journal.title, content: journal.content });
    } catch (err) {
      setError('Failed to load journal entry');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await journalAPI.update(id, formData);
      navigate(`/journal/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update journal entry');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-moss mb-6">Edit Journal Entry</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-sage/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
                placeholder="Give your entry a title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                required
                maxLength={5000}
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-sage/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage resize-none"
                placeholder="Write your thoughts..."
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.content.length} / 5000 characters
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-sage text-white py-3 rounded-lg hover:bg-moss transition font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/journal/${id}`)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;