// lib/api.ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://portfolio-chatbot-8isd.onrender.com',
  ENDPOINTS: {
    CHAT: '/api/chat',
    HEALTH: '/api/health'
  }
};

// Helper function to construct URLs properly
const constructURL = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/+$/, ''); // Remove trailing slashes
  const cleanEndpoint = endpoint.replace(/^\/+/, '/'); // Ensure single leading slash
  return `${baseUrl}${cleanEndpoint}`;
};

export const chatService = {
  async sendMessage(message: string, history: Array<{role: string, content: string}> = []) {
    try {
      const url = constructURL(API_CONFIG.ENDPOINTS.CHAT);
      console.log('Making request to:', url); // Debug log
      
      const response = await fetch(url, {
        method: 'POST', // ✅ Ensure POST method
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          message,
          history: history.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Filter out <think> tags from the response
      const cleanResponse = data.response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      
      return {
        response: cleanResponse,
        timestamp: data.timestamp
      };
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  },

  async checkHealth() {
    try {
      const url = constructURL(API_CONFIG.ENDPOINTS.HEALTH);
      console.log('Health check URL:', url); // Debug log
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, {
        method: 'GET', // ✅ Ensure GET method
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        return data.status === 'healthy';
      }
      return false;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
};
