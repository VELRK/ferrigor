import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { storeEmailActivity } from '../lib/api';

const EmailActivityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Submitting form data:', formData);
      
      const result = await storeEmailActivity(formData);
      console.log('API result:', result);

      if (result.status === 'success') {
        setResponse(result.data);
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setError(result.message || 'Failed to store email activity');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-4">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">Send us a message and we'll get back to you soon.</p>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name">Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label htmlFor="message">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    rows={4}
                    required
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane me-2"></i>
                      Send Message
                    </>
                  )}
                </Button>
              </Form>

              {/* Response Display */}
              {response && (
                <Alert variant="success" className="mt-3">
                  <Alert.Heading>
                    <i className="fa-solid fa-check-circle me-2"></i>
                    Success!
                  </Alert.Heading>
                  <p>Your message has been sent successfully!</p>
                  <hr />
                </Alert>
              )}

              {/* Error Display */}
              {error && (
                <Alert variant="danger" className="mt-3">
                  <Alert.Heading>
                    <i className="fa-solid fa-exclamation-triangle me-2"></i>
                    Error
                  </Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailActivityForm; 