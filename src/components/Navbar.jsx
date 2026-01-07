import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <nav className="bg-gradient-primary shadow-medium border-b border-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-10">
            <h1 
              className="text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-200 tracking-wide"
              onClick={() => navigate('/dashboard')}
            >
              📖 My Journal
            </h1>
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-2.5 bg-white/95 text-moss rounded-xl hover:bg-white hover:shadow-medium transition-all duration-300 font-semibold hover:scale-105 transform"
            >
              + New Entry
            </button>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-right">
              <div className="text-lg font-bold text-white tracking-wide">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-white/80 font-medium">
                {formatDate(currentTime)}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-terracotta text-white rounded-xl hover:bg-terracotta-dark hover:shadow-medium transition-all duration-300 font-semibold hover:scale-105 transform"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;