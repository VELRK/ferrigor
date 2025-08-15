import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { fetchCareers } from '../lib/api';

const CareerSection = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');


  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('CareerSection: Starting to fetch careers...');
      const result = await fetchCareers();
      console.log('CareerSection: API result received:', result);
      
      if (result.status === 'success' && result.data) {
        console.log('CareerSection: Setting careers data:', result.data);
        setCareers(result.data);
        setFilteredCareers(result.data);
      } else if (result.message === 'Fetch not available in this environment') {
        setError('Career data will be loaded when the page is viewed in the browser.');
        setCareers([]);
        setFilteredCareers([]);
      } else {
        console.error('CareerSection: Invalid result format:', result);
        throw new Error(result.message || 'Invalid data format received from API');
      }
    } catch (err) {
      console.error('CareerSection: Error fetching careers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter careers based on search and filter criteria
  useEffect(() => {
    let filtered = careers;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(career => 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(career => 
        career.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    
    // Type filter
    if (typeFilter) {
      filtered = filtered.filter(career => 
        career.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }
    
  
    
    setFilteredCareers(filtered);
  }, [careers, searchTerm, locationFilter, typeFilter]);

  // Get unique values for filter dropdowns
  const getUniqueLocations = () => {
    const locations = [...new Set(careers.map(career => career.location))];
    return locations.filter(location => location).sort();
  };

  const getUniqueTypes = () => {
    const types = [...new Set(careers.map(career => career.type))];
    return types.filter(type => type).sort();
  }; 

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadCareers();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');

  };

  useEffect(() => {
    if (isClient) {
      loadCareers();
    }
  }, [isClient]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <section className="gap no-top">
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <div className="py-5">
                <Spinner animation="border" role="status" variant="primary" size="lg">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h3 className="mt-3">Loading Career Opportunities...</h3>
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gap no-top">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="danger">
                <Alert.Heading>
                  <i className="fa-solid fa-exclamation-triangle me-2"></i>
                  Error Loading Careers
                </Alert.Heading>
                <p>We encountered an error while loading career opportunities. This might be due to:</p>
                <ul>
                  <li>API server is not running</li>
                  <li>Network connectivity issues</li>
                  <li>CORS configuration problems</li>
                </ul>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Error: {error}</small>
                  <div>
                    <Button variant="outline-info" size="sm" className="me-2" onClick={() => {
                      console.log('Testing API endpoint directly...');
                      fetch('https://superfinelabels.in/ferrigor/api/careerData')
                        .then(res => res.json())
                        .then(data => console.log('Direct API test result:', data))
                        .catch(err => console.error('Direct API test error:', err));
                    }}>
                      <i className="fa-solid fa-bug me-1"></i>
                      Test API
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={handleRetry}>
                      <i className="fa-solid fa-redo me-1"></i>
                      Retry ({retryCount})
                    </Button>
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  if (careers.length === 0) {
    return (
      <section className="gap no-top">
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <div className="py-5">
                <i className="fa-solid fa-briefcase fa-3x text-muted mb-3"></i>
                <h3>No Career Opportunities Available</h3>
                <p className="text-muted">Please check back later for new openings.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <>      
      {/* Search and Filter Section */}
      <section className="gap1">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="search-filter-section p-3 rounded">
                <h4 className="mb-3">
                  <i className="fa-solid fa-filter me-2"></i>
                  Search & Filter Careers
                </h4>
                
                <Row>
                  {/* Search Bar */}
                  <Col lg={6} md={12} className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fa-solid fa-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search by job title, description, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  
                  {/* Location Filter */}
                  <Col lg={2} md={4} className="mb-3">
                    <Form.Select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {getUniqueLocations().map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  
                  {/* Type Filter */}
                  <Col lg={2} md={4} className="mb-3">
                    <Form.Select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      {getUniqueTypes().map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  
                  {/* Status Filter */}
                  
                </Row>
                
                {/* Results and Clear Filters */}
                <Row className="align-items-center">
                  <Col md={6}>
                    <p className="mb-0 text-muted">
                      <i className="fa-solid fa-list me-1"></i>
                      Showing {filteredCareers.length} of {careers.length} opportunities
                    </p>
                  </Col>
                  <Col md={6} className="text-md-end">
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={clearFilters}
                      disabled={!searchTerm && !locationFilter && !typeFilter}
                    >
                      <i className="fa-solid fa-times me-1"></i>
                      Clear Filters
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Career Listings */}
      <section className="gap no-top">
        <Container>
          {filteredCareers.length === 0 ? (
            <Row>
              <Col className="text-center">
                <div className="py-5">
                  <i className="fa-solid fa-search fa-3x text-muted mb-3"></i>
                  <h3>No Results Found</h3>
                  <p className="text-muted">
                    No career opportunities match your current search criteria.
                    <br />
                    Try adjusting your filters or search terms.
                  </p>
                  <Button variant="outline-primary" onClick={clearFilters}>
                    <i className="fa-solid fa-undo me-1"></i>
                    Reset Filters
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              {filteredCareers.map((career, index) => (
                <Col lg={12} key={career.id} className="mb-4">
                  <div className="career-item">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="career-content">
                          <div className="career-header d-flex align-items-center mb-3">
                            <h3 className="career-title mb-0">{career.title}</h3>
                            <div className="career-badges ms-3">
                              <span className="badge bg-primary me-2 text-capitalize">{career.type}</span>
                              {career.status === 'active' && (
                                <span className="badge bg-success">Active</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="career-details mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <p className="mb-2">
                                  <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                                  <strong>Location:</strong> {career.location}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <p className="mb-2">
                                  <i className="fa-solid fa-clock me-2 text-primary"></i>
                                  <strong>Type:</strong> {career.type}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="career-description">
                            <p className="mb-0">{career.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-lg-4 text-lg-end">
                        <div className="career-actions">
                          <Button 
                            variant="primary" 
                            size="lg"
                            className="me-2"
                            href={`mailto:careers@ferrigor.com?subject=${encodeURIComponent(career.title)}`}
                          >
                            <i className="fa-solid fa-paper-plane me-2"></i>
                            Apply Now
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="lg"
                            onClick={() => {
                              // Copy job details to clipboard
                              const jobDetails = `Job Title: ${career.title}\nLocation: ${career.location}\nType: ${career.type}\nDescription: ${career.description}`;
                              navigator.clipboard.writeText(jobDetails);
                              alert('Job details copied to clipboard!');
                            }}
                          >
                            <i className="fa-solid fa-copy me-2"></i>
                            Copy Details
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="career-footer mt-3 pt-3 border-top">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <small className="text-muted">
                            <i className="fa-solid fa-calendar me-1"></i>
                            Posted: {new Date(career.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="col-md-6 text-md-end">
                          <small className="text-muted">
                            <i className="fa-solid fa-eye me-1"></i>
                            Position ID: {career.id}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Career Benefits Section */}
      <section className="gap no-top" style={{ background: "#f8f9fa" }}>
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <div className="heading mb-5">
                <h2>Why Join Ferrigor?</h2>
                <p>Discover the benefits of being part of our innovative team</p>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="benefit-item text-center">
                <div className="benefit-icon mb-3">
                  <i className="fa-solid fa-rocket fa-3x text-primary"></i>
                </div>
                <h4>Innovation</h4>
                <p>Work on cutting-edge post-tensioning technologies</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="benefit-item text-center">
                <div className="benefit-icon mb-3">
                  <i className="fa-solid fa-globe fa-3x text-primary"></i>
                </div>
                <h4>Global Projects</h4>
                <p>Contribute to international engineering projects</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="benefit-item text-center">
                <div className="benefit-icon mb-3">
                  <i className="fa-solid fa-users fa-3x text-primary"></i>
                </div>
                <h4>Team Growth</h4>
                <p>Learn from experienced engineering professionals</p>
              </div>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <div className="benefit-item text-center">
                <div className="benefit-icon mb-3">
                  <i className="fa-solid fa-chart-line fa-3x text-primary"></i>
                </div>
                <h4>Career Development</h4>
                <p>Continuous learning and advancement opportunities</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CareerSection; 