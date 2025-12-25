// Simple CORS proxy server for AI API
// Run this with: node proxy-server.js

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('📤 Proxying request:', req.body);
    
    const response = await fetch('https://nextgencodex-aitripplanner.hf.space/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'nextgencodex',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('📥 Received response, sending to client');
    
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CORS Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying to: https://nextgencodex-aitripplanner.hf.space`);
});
