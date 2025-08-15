import Head from 'next/head';
import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import MapWithMarkers from "@components/MapWithMarkers";
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { storeEmailActivity } from '../lib/api';
import { Accordion } from 'react-bootstrap';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Submitting contact form data:', values);
      
      const result = await storeEmailActivity({
        name: values.name,
        email: values.email,
        message: values.message
      });
      
      console.log('Contact form API result:', result);

      if (result.status === 'success') {
        setResponse(result.data);
        resetForm();
      } else {
        setError(result.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const faqData = {
  items: [
    {
      title: "What is post-tensioning in concrete structures?",
      text: (
        <>
          <p>
            Post-tensioning is a structural reinforcement technique where
            high-strength steel tendons are tensioned after concrete has cured.
            This method enhances the load-bearing capacity, reduces cracking,
            and allows for longer spans—making it ideal for Dubai’s high-rise
            buildings, bridges, and podium slabs.
          </p>
        </>
      ),
    },
    {
      title: "Why choose post-tensioned slabs over traditional reinforcement?",
      text: (
        <>
          <p><strong>Post-tensioned slabs offer :</strong></p>
          <ol>
            <li>Cost-effective construction</li>
            <li>Reduced cracking and deflection</li>
            <li>Longer spans with fewer columns</li>
          </ol>
          <p>
            These benefits are especially valuable in commercial towers,
            parking structures, and residential podiums where space and
            efficiency are critical.
          </p>
        </>
      ),
    },
    {
      title: "How does the post-tensioning process work?",
      text: (
        <>
          <p><strong>The post-tensioning process includes :</strong></p>
          <ol>
            <li>Installing ducts and tendons before concrete pouring</li>
            <li>Pouring and curing the concrete</li>
            <li>Stressing tendons using hydraulic jacks</li>
            <li>Locking the tension with anchors</li>
            <li>Grouting (for bonded systems) to protect against corrosion</li>
          </ol>
        </>
      ),
    },
    {
      title: "What’s the difference between bonded and unbonded post-tensioning systems?",
      text: (
        <>
          <ul>
            <li>
              <strong>Bonded System:</strong> Tendons are grouted after
              stressing, creating a permanent bond with the concrete. Ideal for
              bridges, heavy slabs, and infrastructure.
            </li>
            <li>
              <strong>Unbonded System:</strong> Tendons remain free inside
              plastic sheathing, allowing flexibility. Common in residential
              buildings and slab-on-grade applications.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Is post-tensioning safe and durable?",
      text: (
        <>
          <p>
            Yes. When designed and installed according to Dubai Municipality
            and international standards, post-tensioned systems are extremely
            safe and long-lasting. Regular inspections and stress monitoring
            ensure structural integrity for decades.
          </p>
        </>
      ),
    },
  ],
};



  return (
    <Layouts>
      <PageBanner
        pageTitle={"Contact Us"}
        pageDesc={"our values and vaulted us to the top of our industry."}
      />

      {/* Contact Form 2 Start */}
      <section className="gap contact-form-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="data">
                <span>Expert Post-Tensioning Solutions – Contact Us</span>
                <h2>Precision Engineering Starts with a Conversation</h2>
                <p>
                  Looking for expert guidance on post-tensioning systems, PT slab design, or structural strengthening? Our Dubai-based engineering team is ready to deliver customized solutions that meet your project’s technical and budgetary needs.
                </p>
                <p></p>
                <p className="contact-mrg">Fill out the form below, and we'll respond with precision-engineered recommendations tailored to your structure.</p>
                <Formik
                  initialValues={{
                    email: "",
                    name: "",
                    message: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      id="contactForm"
                    >
                      <div className="row g-0">
                        <textarea
                          name="message"
                          placeholder="Your Message / Inquiry"
                          required="required"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.message}
                        />
                      </div>
                      <div className="row g-0">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Full Name"
                          required="required"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>
                      <div className="row g-0">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          name="email"
                          required="required"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                      </div>           
             
                      <button type="submit" className="theme-btn" disabled={loading}>
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
                            Send Message <i className="fa-solid fa-angles-right" />
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
                            <div className="col-lg-4 offset-lg-1" >
                <div className="bio">
                    <div className="data">
                        <figure>
                            <img className="author" src="/img/preloader-new.png" alt="Bio Image" />
                        </figure>
                        <h3>FERRIGOR</h3>
                        {/* <p>Director of Constro Company</p>
                        <figure>
                            <img src="/img/signature.png" alt="Signature Image" />
                        </figure> */}
                    </div>
                </div>
                <div className="info">
                    <ul className="contact">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="79" height="94" viewBox="0 0 79 94"> <defs> <clipPath id="clip-location_Bd"> <rect width="79" height="94"/> </clipPath> </defs> <g id="location_Bd" data-name="location B" clipPath="url(#clip-location_B)"> <path id="Path_1gfhjfjytkd" data-name="Path 1" d="M962.855,575.375a3,3,0,0,1-2.1-.861l-26.263-25.826c-11.03-11.993-13.791-27.653-7.492-42a38.334,38.334,0,0,1,34.959-23.117l1.346.009c15.262,0,27.868,8.452,33.722,22.609,6.152,14.878,3.046,31.554-7.912,42.485-.528.555-24.064,25.75-24.064,25.75a3,3,0,0,1-2.129.951Zm-.9-85.8A31.924,31.924,0,0,0,932.49,509.1c-5.313,12.1-2.954,25.342,6.31,35.419l23.963,23.559c15.027-16.085,20.179-21.585,22.274-23.488l-.164-.165c9.233-9.209,11.825-23.318,6.605-35.944a29.677,29.677,0,0,0-28.177-18.9Z" transform="translate(-922.725 -482.15)"/> <path id="Path_24cr2r" data-name="Path 2d" d="M15,6a9,9,0,1,0,9,9,9.01,9.01,0,0,0-9-9m0-6A15,15,0,1,1,0,15,15,15,0,0,1,15,0Z" transform="translate(25 26)"/> </g> </svg>
                            <div>
                                <h3>Address:</h3>
                                <p>M-22, Sky Business Center, Dubai Festival City, Dubai, UAE</p>
                            </div>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="62" viewBox="0 0 40 62"> <defs> <clipPath id="fsddffsdfsdfsdf"> <rect width="40" height="62"/> </clipPath> </defs> <g id="Mobsfddfsdile" clipPath="url(#fsddffsdfsdfsdf)"> <path id="Pafdth_1dfhgfhgjjdfhgddffgdfgdfgdfgdfgd" data-name="Path 1" d="M10,6a4,4,0,0,0-4,4V50a4,4,0,0,0,4,4H28a4,4,0,0,0,4-4V10a4,4,0,0,0-4-4H10m0-6H28A10,10,0,0,1,38,10V50A10,10,0,0,1,28,60H10A10,10,0,0,1,0,50V10A10,10,0,0,1,10,0Z" transform="translate(1 1)"/> <path id="Padfth_2" data-name="Path 2" d="M2.5,0h7a2.5,2.5,0,0,1,0,5h-7a2.5,2.5,0,0,1,0-5Z" transform="translate(14 48)"/> </g></svg>
                            <div>
                                <h3>Telephone:</h3>
                                <p>Tel:   +97 14 57 61 193</p>
                            </div>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="102" height="93" viewBox="0 0 102 93"> <defs> <clipPath id="clip-Emaidl_Bhf"> <rect width="102" height="93"/> </clipPath> </defs> <g id="Emaidfgsdl_B" data-name="Email B" clipPath="url(#clip-Email_Bsdfhf)"> <path id="Pathsdf_1" data-name="Path 1" d="M969.85,550.4,927.766,528.2l2.8-5.307,39.229,20.7,37.712-20.677,2.885,5.261Z" transform="translate(-918 -492)"/> <path id="Path_2dfsdsffgs" data-name="Path 2" d="M969.562,494.385l48.391,25.361,0,1.818c-.023,17.272-.043,42.814-.012,47.124l.012.024v.709c0,5.426-1.516,9.425-4.508,11.885a10.4,10.4,0,0,1-6.575,2.344l-75.5-.016c-3.557.071-5.965-.931-7.717-2.752-2.4-2.5-3.517-6.391-3.317-11.577l.065-1.194c.116-5.315.029-29.954-.067-46.535l-.011-1.842Zm42.386,28.988-42.411-22.227-43.2,22.238c.189,32.939.239,42.8-.143,46.148l.13.005c-.168,4.351.8,6.309,1.645,7.185a3.342,3.342,0,0,0,2.458.984l76.043-.071a4.65,4.65,0,0,0,3.16-.963c1.517-1.248,2.319-3.754,2.319-7.25h.09C1011.893,566.689,1011.9,557.566,1011.947,523.373Z" transform="translate(-918 -492)"/> </g> </svg>
                            <div>
                                <h3>Email:</h3>
                                <p>info@ferrigor.com</p>
                            </div>
                        </li>
                    </ul>
                    <ul className="social-medias">
                        <li>
                            <a className="linkedin" href="https://www.linkedin.com/company/ferrigor" target="_blank"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
                        </li>
                        
                    </ul>
                </div>
                </div>     

          </div>
        </div>
      </section>
      {/* Contact Form 2 End */}

      {/* Contact Faqs Start */}
      <section className="contact-faqs">
        <div className="heading">
          <figure>
            <img src="/img/abt-icon.jpg" alt="Heading Icon" />
          </figure>
          <span>Frequently asked question</span>
          <h2>Smart Solutions for Your Post-Tensioning Needs in Dubai</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="acc2">
                <Accordion defaultActiveKey="contact-acc-0" alwaysOpen>
                  {faqData.items.map((item, key) => (
                    <Accordion.Item
                      key={`contact-item-${key}`}
                      eventKey={`contact-acc-${key}`}
                    >
                      <Accordion.Header>{item.title}</Accordion.Header>
                      <Accordion.Body>
                        {item.text}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Faqs End */}

      {/* Contact Map Start */}
      <div className="row">      
        <div className="col-lg-12">
          <div className="contact-map" style={{ height: "760px", width: "100%" }}> <MapWithMarkers /> </div>
         </div>   
      </div>
    
      {/* Contact Map End */}
    </Layouts>
  );
};

export default Contact;
