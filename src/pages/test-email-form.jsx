import Head from 'next/head';
import Layouts from "@layouts/Layouts";
import EmailActivityForm from "@components/EmailActivityForm";

export default function TestEmailForm() {
  return (
    <Layouts>
      <Head>
        <title>Test Email Form - Ferrigor</title>
        <meta name="description" content="Test the email activity form API integration" />
      </Head>
      
      <div className="container-fluid bg-light py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-primary mb-3">Email Activity Form Test</h1>
            <p className="lead text-muted mb-5">
              This page demonstrates the integration with the store_email_activity API endpoint.
              <br />
              Fill out the form below and see the API response after submission.
            </p>
          </div>
        </div>
      </div>
      
      <EmailActivityForm />
      
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fa-solid fa-info-circle me-2"></i>
                  API Endpoint Information
                </h5>
              </div>
              <div className="card-body">
                <h6>Endpoint:</h6>
                <code className="bg-light p-2 rounded d-block mb-3">
                  https://superfinelabels.in/ferrigor/api/store_email_activity
                </code>
                
                <h6>Method:</h6>
                <p><code>POST</code></p>
                
                <h6>Request Body (JSON):</h6>
                <pre className="bg-light p-3 rounded">
{`{
  "name": "string",
  "email": "string", 
  "message": "string"
}`}
                </pre>
                
                <h6>Features:</h6>
                <ul>
                  <li>Form validation for required fields</li>
                  <li>Loading states during submission</li>
                  <li>Success/error message display</li>
                  <li>Full API response display</li>
                  <li>Console logging for debugging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
} 