# AI Feature Integration Guide

## Overview
This guide explains how to integrate the AI trip planning feature into your Ceyluxe tourism website using the Hugging Face Space API endpoint.

## API Details
- **Endpoint**: `https://nextgencodex-aitripplanner.hf.space/chat`
- **Method**: `POST`
- **API Key**: `nextgencodex`
- **Content-Type**: `application/json`

## Files Created

### 1. **aiService.js** (`src/services/aiService.js`)
Core service for making API calls to the AI service.

**Available Functions:**
- `sendAIQuery(query)` - Send a raw query to the AI
- `planTrip(destination, preferences)` - Plan a trip with specific preferences
- `getDestinationRecommendations(destination)` - Get recommendations for a destination
- `generateItinerary(destination, days)` - Generate a day-wise itinerary

**Usage Example:**
```javascript
import { planTrip, generateItinerary } from './services/aiService';

// Plan a trip
const tripPlan = await planTrip('Colombo', {
  duration: '3 days',
  budget: '$500-1000',
  interests: ['Adventure', 'Cultural']
});

// Generate itinerary
const itinerary = await generateItinerary('Kandy', 5);
```

### 2. **AIContext.jsx** (`src/context/AIContext.jsx`)
React context for managing AI chat state and interactions.

**Available Hooks & Methods:**
- `useAI()` - Hook to access AI context
- `chat(query)` - Send a message to AI
- `planTripAI(destination, preferences)` - Plan a trip
- `getRecommendations(destination)` - Get destination recommendations
- `createItinerary(destination, days)` - Create an itinerary
- `messages` - Array of chat messages
- `loading` - Loading state
- `error` - Error message
- `clearMessages()` - Clear chat history

### 3. **AIChatBox.jsx** (`src/components/AIChatBox.jsx`)
Floating chat widget for real-time AI conversations.

**Features:**
- Fixed position floating button
- Expandable chat window
- Message history with timestamps
- Loading and error states
- Auto-scroll to latest messages

### 4. **ai-trip-planner.jsx** (`src/components/ai-trip-planner.jsx`)
Dedicated component for trip planning with form inputs.

**Features:**
- Destination input
- Duration selector
- Budget input
- Interest selection (8 predefined options)
- Form validation
- Error handling

## Integration Steps

### Step 1: Wrap Your App with AIProvider
In your `main.jsx` or `App.jsx`:

```javascript
import { AIProvider } from './context/AIContext';
import App from './App';

ReactDOM.render(
  <AIProvider>
    <App />
  </AIProvider>,
  document.getElementById('root')
);
```

### Step 2: Add Floating Chat Widget
In your main layout component (e.g., `App.jsx`):

```javascript
import AIChatBox from './components/AIChatBox';

function App() {
  return (
    <>
      {/* Your existing content */}
      <AIChatBox />
    </>
  );
}
```

### Step 3: Add Trip Planner Page (Optional)
Create a new page or section for the trip planner:

```javascript
import AITripPlanner from './components/ai-trip-planner';

function TripPlannerPage() {
  return (
    <div className="container mx-auto py-10">
      <AITripPlanner />
    </div>
  );
}
```

### Step 4: Use Hooks in Components
In any component within the AIProvider:

```javascript
import { useAI } from './context/AIContext';

function MyComponent() {
  const { chat, planTripAI, loading, messages, error } = useAI();

  const handlePlanTrip = async () => {
    try {
      await planTripAI('Colombo', { duration: '3 days' });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

## Example Queries

The AI service understands natural language queries:

- "Plan a trip to Colombo"
- "What are the best attractions in Kandy?"
- "Create a 5-day itinerary for Sri Lanka"
- "I want to visit beaches in Galle with a budget of $500"
- "Show me adventure activities in Nuwara Eliya"

## Error Handling

All functions handle errors gracefully:

```javascript
try {
  const result = await planTrip('Colombo');
  console.log('Trip plan:', result);
} catch (error) {
  console.error('Failed to plan trip:', error.message);
}
```

## Response Format

The AI service typically returns responses in this format:

```json
{
  "response": "Your AI-generated response here...",
  "message": "Alternative message field",
  "status": "success"
}
```

## Styling

All components use Tailwind CSS classes. Ensure your project has Tailwind CSS configured (it should already be based on your `tailwind.config.cjs`).

## Best Practices

1. **Always wrap components with AIProvider** - Required for useAI() hook to work
2. **Handle loading states** - Show loading indicators while waiting for responses
3. **Implement error handling** - Always have try-catch blocks and error UI
4. **Optimize messages** - Clear old messages periodically in long conversations
5. **API rate limiting** - Be aware of potential rate limits from the API service

## Testing

To test the feature locally:

```bash
# Start your dev server
npm run dev

# Open browser and navigate to your app
# Click the floating chat button to start chatting
```

## Environment Variables (Optional)

You can make the API endpoint configurable:

```javascript
// In aiService.js
const AI_API_BASE = import.meta.env.VITE_AI_API_BASE || 'https://nextgencodex-aitripplanner.hf.space';
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || 'nextgencodex';
```

Then in `.env`:
```
VITE_AI_API_BASE=https://nextgencodex-aitripplanner.hf.space
VITE_AI_API_KEY=nextgencodex
```

## Troubleshooting

### Issue: "useAI must be used within an AIProvider"
**Solution**: Make sure your app is wrapped with `<AIProvider>` at the root level.

### Issue: CORS errors
**Solution**: The API endpoint should support CORS. If not, you may need to use a backend proxy.

### Issue: API key not working
**Solution**: Verify the API key is correct: `nextgencodex`

### Issue: No response from AI
**Solution**: Check your network tab to ensure requests are being sent and ensure the endpoint is accessible.

## Future Enhancements

- Add conversation persistence (localStorage/database)
- Implement voice input/output
- Add image generation for trip visualizations
- Create multi-user session support
- Add advanced filtering and sorting options
- Implement feedback mechanism for better responses

## Support

For issues or questions about the AI service, contact: support@nextgencodex.com
