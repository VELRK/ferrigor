import { fetchProjects, fetchProjectById } from './api';

const DEFAULT_PROJECT_IMAGE = '/img/default-project.jpg';

export async function getSortedProjectsData() {
  try {
    console.log('Calling fetchProjects...');
    const response = await fetchProjects();
    console.log('Raw API response:', response);
    
    // Handle different possible API response structures
    let projectsData = [];
    
    if (response && response.data) {
      projectsData = response.data;
    } else if (response && Array.isArray(response)) {
      projectsData = response;
    } else if (response && response.projects) {
      projectsData = response.projects;
    } else if (response && response.items) {
      projectsData = response.items;
    }
    
    console.log('Extracted projects data:', projectsData);
    
    if (projectsData && Array.isArray(projectsData) && projectsData.length > 0) {
      // Transform API data to match expected format and add default image
      const transformedProjects = projectsData.map(project => ({
        id: project.id || project.project_id,
        title: project.title || project.name || project.project_title,
        short: project.description || project.short_description || project.summary || 'No description available',
        location: project.location || project.project_location || 'N/A',
        dates: project.project_date || project.date || project.created_date || 'N/A',
        image: project.image || '/img/project3.jpeg',
        status: project.status || 'active',
        created_at: project.created_at || project.created_date,
        updated_at: project.updated_at || project.updated_date
      }));
      
      console.log('Transformed projects:', transformedProjects);
      return transformedProjects;
    }
    
    console.log('No valid projects data found, returning empty array');
    return [];
  } catch (error) {
    console.error('Error getting projects data:', error);
    return [];
  }
}

export async function getFeaturedProjectsData(ids) {
  try {
    const response = await fetchProjects();
    if (response.status === 'success' && response.data) {
      const allProjects = response.data
        .filter(project => ids.includes(project.id))
        .map(project => ({
          id: project.id,
          title: project.title,
          short: project.description,
          location: project.location,
          dates: project.project_date,
          image: project.image || DEFAULT_PROJECT_IMAGE,
          status: project.status,
          created_at: project.created_at,
          updated_at: project.updated_at
        }));
      
      return allProjects.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    return [];
  } catch (error) {
    console.error('Error getting featured projects data:', error);
    return [];
  }
}

export async function getRelatedProjects(current_id) {
  try {
    const response = await fetchProjects();
    if (response.status === 'success' && response.data) {
      const allProjects = response.data
        .filter(project => project.id !== current_id)
        .map(project => ({
          id: project.id,
          title: project.title,
          short: project.description,
          location: project.location,
          dates: project.project_date,
          image: project.image || DEFAULT_PROJECT_IMAGE,
          status: project.status,
          created_at: project.created_at,
          updated_at: project.updated_at
        }));
      
      return allProjects.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    return [];
  } catch (error) {
    console.error('Error getting related projects data:', error);
    return [];
  }
}

export async function getProjectData(id) {
  try {
    const response = await fetchProjectById(id);
    if (response && response.status === 'success' && response.data) {
      const project = response.data;
      return {
        id: project.id,
        title: project.title,
        short: project.description,
        location: project.location,
        dates: project.project_date,
        image: project.image || DEFAULT_PROJECT_IMAGE,
        status: project.status,
        created_at: project.created_at,
        updated_at: project.updated_at,
        // Add default values for missing fields that components expect
        checklist: {
          title: "What's Included in Project",
          items: [
            "Dedication to client satisfaction",
            "Teamwork and collaboration",
            "Being leader in our profession",
            "Pride in our works and excellence"
          ]
        },
        details: {
          items: [
            { label: "Sectors", value: "Construction", icon: "/img/icon-pd-1.svg" },
            { label: "Owner", value: "Project Owner", icon: "/img/icon-pd-2.svg" },
            { label: "Square Feet", value: "To be determined", icon: "/img/icon-pd-3.svg" },
            { label: "Project Date", value: project.project_date, icon: "/img/icon-pd-4.svg" }
          ]
        },
        slider: {
          items: [
            { image: project.image || DEFAULT_PROJECT_IMAGE, alt: project.title }
          ]
        }
      };
    }
    return null;
  } catch (error) {
    console.error(`Error getting project data for ${id}:`, error);
    return null;
  }
}

export function getAllProjectsIds() {
  // This function is used for static generation, but since we're now using API,
  // we'll return an empty array and let Next.js handle fallback
  return [];
}