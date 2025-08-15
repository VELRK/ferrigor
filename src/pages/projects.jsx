import Layouts from "@layouts/Layouts";

import { getSortedProjectsData } from "@library/projects";

import PageBanner from "@components/PageBanner";

const Portfolio = (props) => {
  console.log('Projects data received:', props.projects);
  
  return (
    <Layouts>
      <PageBanner pageTitle={"Our Projects"} pageDesc={"our values and vaulted us to the top of our industry."} />

      {/* Our Project One Start */}
      <section className="gap no-top project-completed our-projects-one">
        {props.projects && props.projects.length > 0 ? (
          props.projects.map((item, key) => (
            <div key={`projects-item-${key}`} className="prj-post">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="proj-data">
                      <h3>{item.title}</h3>
                      <p>{item.short}</p>
                      <div className="loc-date">
                        <div>
                          <span>LOCATION:</span>
                          <span>{item.location}</span>
                        </div>
                        <div>
                          <span>DATE:</span>
                          <span>{item.dates}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="data">
                      <figure>
                        <img 
                          src={item.image || '/img/project3.jpeg'} 
                          alt={item.title} 
                          onError={(e) => {
                            e.target.src = '/img/project3.jpeg';
                          }}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h4>No projects available at the moment.</h4>
                <p>This could be due to:</p>
                <ul style={{textAlign: 'left', display: 'inline-block'}}>
                  <li>API endpoint not accessible</li>
                  <li>API returning empty data</li>
                  <li>Network connectivity issues</li>
                </ul>
                <p><strong>Debug info:</strong> {JSON.stringify(props.projects)}</p>
                <p><strong>API URL:</strong> https://superfinelabels.in/ferrigor/api/projects</p>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Our Project One End */}
      
    </Layouts>
  );
};
export default Portfolio;

export async function getServerSideProps() {
  try {
    console.log('Fetching projects from API...');
    const allProjects = await getSortedProjectsData();
    console.log('API response:', allProjects);

    return {
      props: {
        projects: allProjects || []
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      props: {
        projects: []
      }
    }
  }
}