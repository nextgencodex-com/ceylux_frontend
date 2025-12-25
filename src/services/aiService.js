// Use proxy server to avoid CORS issues
const USE_PROXY = import.meta.env.VITE_USE_AI_PROXY === 'true';
const AI_API_BASE = USE_PROXY 
  ? 'http://localhost:3001/api' 
  : 'https://nextgencodex-aitripplanner.hf.space';
const AI_API_KEY = 'nextgencodex';

/**
 * Send a query to the AI chat service
 * @param {string} query - The user's query or trip planning request
 * @returns {Promise<Object>} The AI response
 */
export const sendAIQuery = async (query) => {
  try {
    console.log('📤 Sending query to AI:', query);
    console.log('🌐 API Endpoint:', `${AI_API_BASE}/chat`);
    console.log('🔧 Using proxy:', USE_PROXY);
    
    const requestBody = { query };
    console.log('📦 Request body:', requestBody);
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Only add API key if not using proxy (proxy adds it for us)
    if (!USE_PROXY) {
      headers['X-API-Key'] = AI_API_KEY;
    }
    
    const response = await fetch(`${AI_API_BASE}/chat`, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(requestBody),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API returned error:', errorText);
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('📥 Received response from AI:', data);
    console.log('📥 Response type:', typeof data);
    console.log('📥 Response keys:', Object.keys(data));
    return data;
  } catch (error) {
    console.error('❌ Error calling AI service:', error);
    console.error('❌ Error type:', error.constructor.name);
    console.error('❌ Error message:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error('🚫 This is likely a CORS or network error');
      console.error('💡 Try enabling the proxy server: npm run proxy');
    }
    throw error;
  }
};

/**
 * Send a trip planning request to the AI service
 * @param {string} destination - The destination for trip planning
 * @param {Object} preferences - Additional preferences (duration, budget, interests, etc.)
 * @returns {Promise<Object>} The AI-generated trip plan
 */
export const planTrip = async (destination, preferences = {}) => {
  const queryParts = [`Plan a trip to ${destination}`];
  
  if (preferences.duration) {
    queryParts.push(`for ${preferences.duration}`);
  }
  if (preferences.budget) {
    queryParts.push(`with a budget of ${preferences.budget}`);
  }
  if (preferences.interests && preferences.interests.length > 0) {
    queryParts.push(`including activities like ${preferences.interests.join(', ')}`);
  }

  const query = queryParts.join(' ');
  return sendAIQuery(query);
};

/**
 * Get AI recommendations for a destination
 * @param {string} destination - The destination to get recommendations for
 * @returns {Promise<Object>} AI recommendations
 */
export const getDestinationRecommendations = async (destination) => {
  const query = `What are the best attractions and activities to visit in ${destination}?`;
  return sendAIQuery(query);
};

/**
 * Get itinerary suggestions from AI
 * @param {string} destination - The destination
 * @param {number} days - Number of days for the itinerary
 * @returns {Promise<Object>} AI-generated itinerary
 */
export const generateItinerary = async (destination, days = 3) => {
  const query = `Create a ${days}-day itinerary for ${destination}`;
  return sendAIQuery(query);
};

export default {
  sendAIQuery,
  planTrip,
  getDestinationRecommendations,
  generateItinerary,
};
