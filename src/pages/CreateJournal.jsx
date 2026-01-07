import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { journalAPI } from '../services/api';
import Navbar from '../components/Navbar';

const CreateJournal = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await journalAPI.create(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-large p-10 animate-scale-in border border-sage/10">
          <h2 className="text-4xl font-bold text-moss mb-8 tracking-tight">New Journal Entry</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 animate-slide-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Title
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-4 border-2 border-sage/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 text-lg hover:border-sage/40 bg-gray-50/50 focus:bg-white font-medium"
                placeholder="Give your entry a title..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Content
              </label>
              <textarea
                required
                maxLength={5000}
                rows={14}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-5 py-4 border-2 border-sage/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent resize-none transition-all duration-300 hover:border-sage/40 bg-gray-50/50 focus:bg-white leading-relaxed"
                placeholder="Write your thoughts..."
              />
              <p className="text-sm text-gray-500 mt-3 font-medium">
                {formData.content.length} / 5000 characters
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-primary text-white py-4 rounded-xl hover:shadow-medium transition-all duration-300 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-pulse-soft">Creating...</span>
                  </span>
                ) : 'Create Entry'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 hover:shadow-soft transition-all duration-300 font-bold text-base"
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

export default CreateJournal;