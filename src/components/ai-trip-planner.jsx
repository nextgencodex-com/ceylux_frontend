import React, { useState } from 'react';
import { useAI } from '../context/AIContext';
import { Loader, AlertCircle } from 'lucide-react';

const AITripPlanner = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3 days');
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const { loading, error, planTripAI } = useAI();

  const interestOptions = [
    'Adventure',
    'Cultural',
    'Beach',
    'Mountains',
    'Food & Wine',
    'History',
    'Wildlife',
    'Relaxation'
  ];

  const handleInterestToggle = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handlePlanTrip = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    try {
      await planTripAI(destination, {
        duration,
        interests,
        budget
      });
    } catch (err) {
      console.error('Error planning trip:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Trip Planner</h2>
      <p className="text-gray-600 mb-6">Tell us where you want to go, and our AI will create a perfect itinerary for you!</p>

      <form onSubmit={handlePlanTrip} className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Where do you want to go? *
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Colombo, Kandy, Galle"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How long is your trip?
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="1 day">1 day</option>
            <option value="2 days">2 days</option>
            <option value="3 days">3 days</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget (optional)
          </label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., $500-1000, Budget, Luxury"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What are you interested in?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  interests.includes(interest)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                }`}
                disabled={loading}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !destination.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Planning your trip...
            </>
          ) : (
            '✈️ Plan My Trip'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-6">
        Powered by AI | Your personalized travel assistant
      </p>
    </div>
  );
};

export default AITripPlanner;
