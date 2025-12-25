import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../context/AIContext';
import { Send, Loader, AlertCircle } from 'lucide-react';

const AIChatBox = ({ className = '' }) => {
  const [input, setInput] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const { messages, loading, error, chat, clearMessages } = useAI();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    console.log('📊 Messages updated:', messages);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    console.log('📤 Sending message:', userMessage);

    try {
      await chat(userMessage);
      console.log('✅ Chat message sent successfully');
    } catch (err) {
      console.error('❌ Chat error:', err);
    }
  };

  if (!chatVisible) {
    return (
      <button
        onClick={() => setChatVisible(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all ${className}`}
        aria-label="Open AI Chat"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-full max-w-2xl h-screen md:w-full md:h-auto md:max-w-2xl md:rounded-lg bg-white rounded-lg shadow-2xl flex flex-col ${className}`} style={{ maxHeight: '80vh' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
        <h3 className="font-semibold">AI Trip Planner</h3>
        <div className="flex gap-2">
          <button
            onClick={clearMessages}
            className="text-sm px-2 py-1 hover:bg-blue-700 rounded transition-colors"
            title="Clear chat"
          >
            Clear
          </button>
          <button
            onClick={() => setChatVisible(false)}
            className="text-xl leading-none hover:bg-blue-700 w-6 h-6 flex items-center justify-center rounded transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {console.log('🎨 Rendering messages, count:', messages.length)}
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            <p>👋 Hello! I'm your AI Trip Planner.</p>
            <p className="mt-2">Ask me anything about trip planning!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            console.log(`📌 Rendering message ${idx}:`, msg);
            return (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : msg.role === 'error'
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-white rounded-b-lg flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trips, destinations..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-600 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBox;
