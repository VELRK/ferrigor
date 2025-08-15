import Data from "@data/sections/contact-form-2.json";
import appData from "@data/app.json";
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { storeEmailActivity } from '../../lib/api';

const ContactForm2Section = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Submitting form data:', values);
      
      const result = await storeEmailActivity({
        name: values.name,
        email: values.email,
        message: values.message
      });
      
      console.log('API result:', result);

      if (result.status === 'success') {
        setResponse(result.data);
        // Form will be reset by Formik
      } else {
        setError(result.message || 'Failed to store email activity');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-one contact-form-two">
        <div className="parallax" style={{backgroundImage: 'url('+Data.bg_image+')'}} />

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="c-form-2">
                <div className="parallax" style={{backgroundImage: 'url(/images/pattren.png)'}} />
                
                <Formik
                    initialValues = {{ email: '', name: '', subject: '', message: '', phone: '' }}
                    validate = { values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.message) {
                            errors.message = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit = {handleFormSubmit}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        resetForm,
                        /* and other goodies */
                    }) => (
                    <form onSubmit={handleSubmit} id="contactForm">
                        <div className="row g-0">
                            <input 
                              type="text" 
                              className="form-control" 
                              id="exampleInputText1" 
                              placeholder="Complete Name"
                              name="name"
                              required="required" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name} 
                            />
                            {errors.name && touched.name && (
                              <div className="text-danger small mt-1">{errors.name}</div>
                            )}
                        </div>
                        <div className="row g-0">
                            <input 
                              type="email" 
                              className="form-control" 
                              id="exampleInputEmail1" 
                              placeholder="Email Address"
                              name="email"
                              required="required" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email} 
                            />
                            {errors.email && touched.email && (
                              <div className="text-danger small mt-1">{errors.email}</div>
                            )}
                        </div>
                        <div className="row g-0">
                            <input 
                              type="tel" 
                              className="form-control" 
                              id="exampleInputPassword1" 
                              placeholder="Phone No"
                              name="phone" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone} 
                            />
                        </div>
                        <div className="row g-0">
                            <div className="select-wrapper">
                            <select 
                              id="inputState-111" 
                              className="form-control" 
                              name="subject" 
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.subject}
                            >
                                <option>Subject</option>
                                <option value="1">Subject 1</option>
                                <option value="2">Subject 2</option>
                                <option value="3">Subject 3</option>
                            </select>
                            </div>
                        </div>
                        <div className="row g-0">
                            <textarea 
                              placeholder="Question / Message?"
                              name="message"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.message}
                            />
                            {errors.message && touched.message && (
                              <div className="text-danger small mt-1">{errors.message}</div>
                            )}
                        </div>
                        <button type="submit" className="theme-btn" disabled={loading || isSubmitting}>
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
                                Submit Now 
                                <i className="fa-solid fa-angles-right" />
                              </>
                            )}
                        </button>

                        {/* Response Display */}
                        {response && (
                          <Alert variant="success" className="mt-3">
                            <Alert.Heading>
                              <i className="fa-solid fa-check-circle me-2"></i>
                              Success!
                            </Alert.Heading>
                            <p>Your message has been sent successfully!</p>
                            <hr />
                            <div className="text-start">
                              <h6>API Response:</h6>
                              <pre className="bg-light p-2 rounded small">
                                {JSON.stringify(response, null, 2)}
                              </pre>
                            </div>
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

                        <div className="form-status" id="contactFormStatus" />
                    </form>
                    )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContactForm2Section;