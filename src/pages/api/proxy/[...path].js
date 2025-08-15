export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = path.join('/');
  
  try {
    const response = await fetch(`https://superfinelabels.in/ferrigor/api/${apiPath}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to proxy request',
      error: error.message 
    });
  }
} 