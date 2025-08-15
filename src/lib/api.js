const API_BASE_URL = 'https://superfinelabels.in/ferrigor/api/';
// pph3uliph3pp
// Polyfill fetch for server-side rendering
const getFetch = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use native fetch
    return window.fetch;
  } else {
    // Server-side: return null to prevent API calls during build
    return null;
  }
};

export async function fetchProjects() {
  try {
    // Check if fetch is available
    if (typeof fetch === 'undefined') {
      console.log('Fetch not available, skipping API call');
      return {
        status: 'error',
        data: [],
        pagination: { current_page: 1, per_page: 1000, total: 0, pages: 1 }
      };
    }

    // Always use the production API URL
    const apiUrl = `${API_BASE_URL}/projects`;
    console.log('Fetching from API:', apiUrl);
    
    const response = await fetch(apiUrl);
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response data:', data);
    console.log('API response data type:', typeof data);
    console.log('API response data keys:', Object.keys(data || {}));
    
    // Validate the response structure
    if (!data) {
      console.error('API returned null or undefined data');
      return {
        status: 'error',
        data: [],
        pagination: { current_page: 1, per_page: 1000, total: 0, pages: 1 }
      };
    }
    
    if (data.status === 'success' && Array.isArray(data.data)) {
      console.log('Valid API response with projects:', data.data.length);
      return data;
    } else if (Array.isArray(data)) {
      console.log('API returned array directly:', data.length);
      return {
        status: 'success',
        data: data,
        pagination: { current_page: 1, per_page: 1000, total: data.length, pages: 1 }
      };
    } else {
      console.error('Unexpected API response structure:', data);
      return {
        status: 'error',
        data: [],
        pagination: { current_page: 1, per_page: 1000, total: 0, pages: 1 }
      };
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      status: 'error',
      data: [],
      pagination: { current_page: 1, per_page: 1000, total: 0, pages: 1 }
    };
  }
}

export async function fetchProjectById(id) {
  const fetch = getFetch();
  if (!fetch) {
    console.log('Skipping API call on server-side');
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

export async function fetchBlogs(page = 1, perPage = 9) {
  try {
    // Always use the production API URL
    const apiUrl = `${API_BASE_URL}/blogs`;
    console.log('Fetching blogs from API:', apiUrl);
    
    const response = await fetch(apiUrl);
    console.log('Blogs API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Blogs API response data:', data);
    
    if (data.status === 'success' && data.data) {
      // Transform the API data to match the expected format
      const transformedBlogs = data.data.map(blog => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        image: blog.blog_image || '/img/blog3.jpeg',
        content_image1: blog.content_image1,
        content_image2: blog.content_image2,
        content_image3: blog.content_image3,
        date: blog.created_at,
        author: blog.author_name,
        content: blog.description
      }));
      
      return {
        status: 'success',
        data: transformedBlogs,
        total: transformedBlogs.length
      };
    }
    
    return {
      status: 'error',
      data: [],
      total: 0
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      status: 'error',
      data: [],
      total: 0
    };
  }
}
//JZJK3sDrxDwv veldemo if0_39707653	(Your vPanel Password)	ftpupload.net	21
//u221026474_ferrigor Velmurugn0071@!!
export async function fetchBlogById(id) {
  try {
    // Always use the production API URL
    const apiUrl = `${API_BASE_URL}/blogs/${id}`;
    console.log('Fetching blog by ID from API:', apiUrl);
    
    const response = await fetch(apiUrl);
    console.log('Blog by ID API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Blog by ID API response data:', data);
    
    if (data.status === 'success' && data.data) {
      const blog = data.data;
      // Transform the API data to match the expected format
      return {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        image: blog.blog_image || blog.content_image1 || blog.content_image2 || blog.content_image3 || '/img/blog3.jpeg',
        date: blog.created_at,
        author: {
          name: blog.author_name,
          avatar: '/img/comment-img-1.jpg' // Default avatar
        },
        contentHtml: blog.description,
        content_image1: blog.content_image1,
        content_image2: blog.content_image2,
        content_image3: blog.content_image3,
        category: ['Uncategorized'], // Default category
        gallery: { enabled: 0, items: [], cols: 3 },
        additional: { enabled: 0, content: '' }
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return null;
  }
}

export async function fetchCareers() {
  try {
    const response = await fetch(`${API_BASE_URL}/careerData`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return { status: 'error', message: error.message, data: [] };
  }
}


export async function storeEmailActivity(emailData) {
  try {
    // Check if fetch is available
    if (typeof fetch === 'undefined') {
      console.log('Fetch not available, skipping API call');
      return {
        status: 'error',
        data: null,
        message: 'Fetch not available in this environment'
      };
    }

    const apiUrl = `${API_BASE_URL}/store_email_activity`;
    console.log('Storing email activity:', emailData);
    console.log('API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailData)
    });
    
    console.log('Email activity API response status:', response.status);
    console.log('Email activity API response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Email activity API response data:', data);
    
    return {
      status: 'success',
      data: data,
      message: 'Email activity stored successfully'
    };
  } catch (error) {
    console.error('Error storing email activity:', error);
    return {
      status: 'error',
      data: null,
      message: error.message
    };
  }
} 