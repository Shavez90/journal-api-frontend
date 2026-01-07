import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authAPI.login(formData);
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    
    // Your backend returns { token, type, expiresIn }
    const token = response.data.token;
    
    if (token) {
      localStorage.setItem('accessToken', token);
      console.log('Token saved:', token);
      navigate('/dashboard');
    } else {
      setError('No token received from server');
    }
  } catch (err) {
    console.error('Login error:', err);
    console.error('Error response:', err.response);
    setError(err.response?.data?.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4">
      <div className="bg-white p-10 rounded-3xl shadow-large w-full max-w-md animate-scale-in border border-sage/10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📖</div>
          <h2 className="text-4xl font-bold text-moss mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-base">Sign in to your journal</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 animate-slide-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
              Username
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-sage/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 hover:border-sage/40 bg-gray-50/50 focus:bg-white"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-3.5 border-2 border-sage/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 hover:border-sage/40 bg-gray-50/50 focus:bg-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary text-white py-4 rounded-xl hover:shadow-medium transition-all duration-300 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse-soft">Signing in...</span>
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-sage-dark font-semibold hover:text-moss transition-colors duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;