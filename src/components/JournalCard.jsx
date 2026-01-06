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
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer border border-sage/10"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-moss">{journal.title}</h3>
        <span className="text-sm text-gray-500">{formatDate(journal.createdAt)}</span>
      </div>
      <p className="text-gray-600 leading-relaxed">
        {truncateContent(journal.content)}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-sage">Click to read more →</span>
        {journal.updatedAt !== journal.createdAt && (
          <span className="text-xs text-gray-400">Edited</span>
        )}
      </div>
    </div>
  );
};

export default JournalCard;