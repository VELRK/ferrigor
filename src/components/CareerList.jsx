import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchCareers } from '../lib/api';

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('CareerList: Starting to fetch careers...');
      const result = await fetchCareers();
      console.log('CareerList: API result received:', result);
      
      if (result.status === 'success' && result.data) {
        console.log('CareerList: Setting careers data:', result.data);
        setCareers(result.data);
      } else if (result.message === 'Fetch not available in this environment') {
        // This happens during server-side rendering, show a message
        setError('Career data will be loaded when the page is viewed in the browser.');
        setCareers([]);
      } else {
        console.error('CareerList: Invalid result format:', result);
        throw new Error(result.message || 'Invalid data format received from API');
      }
    } catch (err) {
      console.error('CareerList: Error fetching careers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadCareers();
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
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Loading career opportunities...</p>
            <small className="text-muted">Fetching from API...</small>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
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
    );
  }

  if (careers.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col className="text-center">
            <div className="py-4">
              <i className="fa-solid fa-briefcase fa-3x text-muted mb-3"></i>
              <h3>No Career Opportunities Available</h3>
              <p className="text-muted">Please check back later for new openings.</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        {careers.map((career) => (
          <Col lg={4} md={6} key={career.id} className="mb-4">
            <Card className="shadow-sm h-100 career-card">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3">
                  <span className="badge bg-primary mb-2 text-capitalize">{career.type}</span>
                  {career.status === 'active' && (
                    <span className="badge bg-success ms-2">Active</span>
                  )}
                </div>
                
                <Card.Title className="fw-bold mb-3">{career.title}</Card.Title>
                
                <div className="mb-3">
                  <p className="text-muted mb-1">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {career.location}
                  </p>
                  <p className="text-muted mb-0">
                    <i className="fa-solid fa-clock me-2"></i>
                    {career.type}
                  </p>
                </div>
                
                <Card.Text className="flex-grow-1">
                  {career.description}
                </Card.Text>
                
                <div className="mt-auto">
                  <Button 
                    variant="primary" 
                    className="w-100"
                    href={`mailto:careers@ferrigor.com?subject=${encodeURIComponent(career.title)}`}
                  >
                    <i className="fa-solid fa-paper-plane me-2"></i>
                    Apply Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CareerList; 