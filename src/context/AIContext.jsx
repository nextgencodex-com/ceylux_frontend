import React, { createContext, useContext, useState } from 'react';
import { sendAIQuery, planTrip, getDestinationRecommendations, generateItinerary } from '../services/aiService';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = (role, content) => {
    console.log(`➕ Adding message with role: ${role}, content length: ${String(content).length}`);
    setMessages(prev => {
      const updated = [...prev, { role, content, timestamp: new Date() }];
      console.log(`📦 Updated messages array, total count: ${updated.length}`);
      return updated;
    });
  };

  const extractResponseText = (response) => {
    console.log('🔍 Extracting response text from:', response);
    
    // Handle null or undefined
    if (!response) {
      console.log('⚠️ Response is null or undefined');
      return '';
    }
    
    let result = '';
    
    // Try common response field names in order of likelihood
    if (typeof response === 'string') {
      result = response;
      console.log('✅ Response is a string');
    } else if (response?.response) {
      result = response.response;
      console.log('✅ Found response.response field');
    } else if (response?.message) {
      result = response.message;
      console.log('✅ Found response.message field');
    } else if (response?.result) {
      result = response.result;
      console.log('✅ Found response.result field');
    } else if (response?.text) {
      result = response.text;
      console.log('✅ Found response.text field');
    } else if (response?.output) {
      result = response.output;
      console.log('✅ Found response.output field');
    } else if (response?.data) {
      result = typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2);
      console.log('✅ Found response.data field');
    } else {
      // Fallback: stringify the whole response
      result = JSON.stringify(response, null, 2);
      console.log('✅ Stringified entire response object');
    }
    
    console.log('📄 Extracted text length:', result.length);
    console.log('📄 Extracted text preview:', result.substring(0, 200) + (result.length > 200 ? '...' : ''));
    return result;
  };

  const chat = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('💬 Starting chat with query:', query);
      
      // Add user message
      addMessage('user', query);
      
      // Get AI response
      const response = await sendAIQuery(query);
      console.log('📨 Got response object:', response);
      
      // Extract and add AI message
      const responseText = extractResponseText(response);
      console.log('📝 Response text to display:', responseText);
      
      if (responseText && responseText.trim()) {
        console.log('✨ Adding assistant message');
        addMessage('assistant', responseText);
      } else {
        console.log('⚠️ Response text is empty, showing fallback');
        addMessage('assistant', 'Got response but could not parse the message. Please try again.');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to get response from AI service';
      console.error('🚨 Chat error:', errorMessage);
      setError(errorMessage);
      addMessage('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const planTripAI = async (destination, preferences = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const query = `Plan a trip to ${destination}${preferences.duration ? ` for ${preferences.duration}` : ''}`;
      addMessage('user', query);
      
      const response = await planTrip(destination, preferences);
      const responseText = extractResponseText(response);
      addMessage('assistant', responseText || 'Trip plan generated successfully');
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to plan trip';
      setError(errorMessage);
      addMessage('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (destination) => {
    try {
      setLoading(true);
      setError(null);
      
      const query = `What are the best attractions in ${destination}?`;
      addMessage('user', query);
      
      const response = await getDestinationRecommendations(destination);
      const responseText = extractResponseText(response);
      addMessage('assistant', responseText || 'Recommendations generated successfully');
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to get recommendations';
      setError(errorMessage);
      addMessage('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createItinerary = async (destination, days = 3) => {
    try {
      setLoading(true);
      setError(null);
      
      const query = `Create a ${days}-day itinerary for ${destination}`;
      addMessage('user', query);
      
      const response = await generateItinerary(destination, days);
      const responseText = extractResponseText(response);
      addMessage('assistant', responseText || 'Itinerary generated successfully');
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate itinerary';
      setError(errorMessage);
      addMessage('error', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  const value = {
    messages,
    loading,
    error,
    chat,
    planTripAI,
    getRecommendations,
    createItinerary,
    clearMessages,
    addMessage,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export default AIContext;
