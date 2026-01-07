import { useNavigate } from 'react-router-dom';

const JournalCard = ({ journal }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateContent = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={() => navigate(`/journal/${journal.id}`)}
      className="group bg-white rounded-2xl p-6 shadow-medium hover:shadow-hover transition-all duration-300 cursor-pointer border border-sage/10 hover:border-sage/30 hover:-translate-y-1 animate-fade-in overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-moss group-hover:text-moss-dark transition-colors duration-300 pr-4">{journal.title}</h3>
          <span className="text-sm text-gray-500 font-medium whitespace-nowrap">{formatDate(journal.createdAt)}</span>
        </div>
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {truncateContent(journal.content)}
        </p>
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-sage-dark font-medium group-hover:text-moss transition-colors duration-300">Click to read more →</span>
          {journal.updatedAt !== journal.createdAt && (
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Edited</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalCard;