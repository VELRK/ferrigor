import { useState } from 'react';
import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Link from "next/link";
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';

import { getSortedServicesData } from "@library/services";

import CallToActionSection from "@components/sections/CallToAction";
import ServicesSection from "@components/sections/Services";
import CountersSection from "@components/sections/Counters";

const Services = (props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Layouts>
      <PageBanner pageTitle={"Services"} pageDesc={"Smart Post-Tensioning Solutions for Modern Construction"} />

      <ServicesSection />

      {/* Construction Services Start */}
      <section className="gap no-top construction-services">
        <div className="container">
          <Tab.Container id="services-tab-content" defaultActiveKey="tab-service-0">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="services-nav">
                <h2>Core Post-Tensioning Services</h2>
                <Nav variant="pills" className="nav nav-pills mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-0">Post-Tension Slab Systems</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-1">Multi-Strand Anchorage Systems</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-2">PT Design & Detailing</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-3">Supply & Installation of LRPC Strands & Anchorages</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-4">Stressing & Grouting Operations</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-5">PT Material Supply</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-6">Strengthening & Retrofitting with External Tendons</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tab-service-7">Technical Consultation & Value Engineering</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <div className="col-lg-8">
              <Tab.Content>
                <Tab.Pane eventKey="tab-service-0" title="General Contracting">
                  <figure>
                    <img className="w-100" src="/img/1service.jpg" alt="Services Nav Image 1" />
                    <figcaption>
                      <h3>Post-Tension Slab Systems</h3>
                      <p>Design and execution of flat slabs, band beams, and raft foundations optimized for load distribution and material efficiency.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-1" title="Construction Consultant">
                  <figure>
                    <img className="w-100" src="/img/2service.png" alt="Services Nav Image 2" />
                    <figcaption>
                      <h3>Multi-Strand Anchorage Systems</h3>
                      <p>Custom-engineered anchorage solutions for bridges, flyovers, and large-scale infrastructure projects.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-2" title="Metal Roofin">
                  <figure>
                    <img className="w-100" src="/img/3service.png" alt="Services Nav Image 3" />
                    <figcaption>
                      <h3>PT Design & Detailing</h3>
                      <p>Advanced modeling using ADAPT, RAM Concept, and AutoCAD to ensure structural performance and compliance with UAE standards.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-3" title="House Renovation">
                  <figure>
                    <img className="w-100" src="/img/4service.png" alt="Services Nav Image 4" />
                    <figcaption>
                      <h3>Supply & Installation of LRPC Strands & Anchorages</h3>
                      <p>Complete procurement and installation of low-relaxation prestressing steel and anchorage accessories.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-4" title="Green Building">
                  <figure>
                    <img className="w-100" src="/img/5service.jpeg" alt="Services Nav Image 5" />
                    <figcaption>
                      <h3>Stressing & Grouting Operations</h3>
                      <p>Precision-controlled stressing and grouting services for bonded systems, ensuring long-term durability and corrosion protection.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-5" title="Green Building">
                  <figure>
                    <img className="w-100" src="/img/6service.png" alt="Services Nav Image 5" />
                    <figcaption>
                      <h3>PT Material Supply</h3>
                      <p>Supply of certified post-tensioning materials conforming to ASTM A416, BS 5896, and EN 10138 standards.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-6" title="Green Building">
                  <figure>
                    <img className="w-100" src="/img/7service.png" alt="Services Nav Image 5" />
                    <figcaption>
                      <h3>Strengthening & Retrofitting with External Tendons</h3>
                      <p>Reinforcement of existing structures using external post-tensioning to increase load capacity and extend service life.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
                <Tab.Pane eventKey="tab-service-7" title="Green Building">
                  <figure>
                    <img className="w-100" src="/img/8service.png" alt="Services Nav Image 5" />
                    <figcaption>
                      <h3>Technical Consultation & Value Engineering</h3>
                      <p>Expert design reviews and cost-optimization strategies that enhance performance without compromising safety.</p>
                    </figcaption>
                  </figure>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
          </Tab.Container>
        </div>
      </section>
      {/* Construction Services End */}

      <CountersSection />

      
     
      
    </Layouts>
  );
};
export default Services;

export async function getStaticProps() {
  const allServices = getSortedServicesData();

  return {
    props: {
      services: allServices
    }
  }
}