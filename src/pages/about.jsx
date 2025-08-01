import dynamic from "next/dynamic";

import Layouts from "@layouts/Layouts";

import PageBanner from "@components/PageBanner";
import CountersSection from "@components/sections/Counters";
import RenovationSection from "@components/sections/Renovation";

const TeamSlider = dynamic( () => import("@components/sliders/Team"), { ssr: false } );
const PartnersSlider = dynamic( () => import("@components/sliders/Partners"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );

const About = () => {
  return (
    <Layouts>
      <PageBanner pageTitle={"About Us"} pageDesc={"our values and vaulted us to the top of our industry."} />
      
      {/* About-First Start */}
      <section className="gap about-first">
        <div className="container">
          <div className="row">
            <h2>Construction Industry Leaders in Post-Tensioning Systems and Structural Engineering</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="who-we-are">
                <div>
                  <h3>Who We Are – Ferrigor Prestressed Concrete Contracting L.L.C S.O.C</h3>
                  <p>Ferrigor is a leading engineering firm based in Dubai, UAE, specializing in post-tensioning systems and advanced structural solutions. We collaborate with contractors, consultants, and developers to deliver cost-effective, high-performance outcomes for complex construction projects.</p>
                </div>
                <div>
                  <h3 class="expertise">Our expertise spans:</h3>
                  <ul class="customeBottom">
                    <li><i className="fa-solid fa-circle-dot" /> Bonded and unbonded post-tensioning systems</li>
                    <li><i className="fa-solid fa-circle-dot" /> Structural design and supervision</li>
                    <li><i className="fa-solid fa-circle-dot" /> Value engineering and site execution</li>
                  </ul>
                </div>                
                  <p class="mb-30">From concept to completion, we integrate technical precision with field-tested reliability—building not just structures, but long-term partnerships based on trust and performance.</p>
                
                <figure>
                  <img className="w-100" src="/img/logo_abt.png" alt="About Image One" />
                </figure>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="who-we-are space top-new">
                <div>
                  <h3>Why Choose Ferrigor?</h3>
                  <ul>
                    <li><i className="fa-solid fa-circle-dot" /> <strong> High-Performance PT Systems – </strong> Bonded and unbonded solutions tailored to project needs</li>
                    <li><i className="fa-solid fa-circle-dot" /> <strong> Value-Engineered Slab Designs – </strong>Optimized for cost, strength, and span efficiency</li>
                    <li><i className="fa-solid fa-circle-dot" /> <strong> UAE-Certified Quality & Safety – </strong>Compliant with Dubai Municipality and international standards</li>
                    <li><i className="fa-solid fa-circle-dot" /> <strong> Sustainable Engineering – </strong>Reduced material usage and environmental impact</li>
                    <li><i className="fa-solid fa-circle-dot" /> <strong> Trusted Across the UAE – </strong>Proven success in residential, commercial, and infrastructure projects</li>
                  </ul> 
                </div>
                <figure>
                  <img className="w-100" src="/img/01_about.png" alt="About Image Two" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About-First End */}

      <CountersSection />

      {/*About How It Works Start */}
      <section className="gap about-how-it-works light-bg-color">
        <div className="heading">
          <figure>
            <img src="/img/abt-icon.jpg" alt="Heading Icon" />
          </figure>
          <span>Plan + Control</span>
          <h2>Post-Tensioning Process – Step-by-Step Structural Precision</h2>
        </div>
     <div className="container">
  <div className="row g-0 container-new">
    <div>
      <figure className="display-flex-new">
        <img  src="/img/02_about.png" alt="About How It Works" />
      </figure>
    </div>
  </div>
</div>

        <div className="container">
          <div className="row g-0">
            <div className="col-lg-3 col-md-6 col-sm-12" >
              <div className="plans">
                <div className="y-box d-flex-all">
                  1.
                </div>
                <h3>Structural Phase Planning</h3>
                <p>We align architectural goals with structural needs, identifying key milestones for seamless post-tensioning integration.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12" >
              <div className="plans">
                <div className="y-box d-flex-all">
                  2.
                </div>
                <h3>Tendon Design & Profiling</h3>
                <p>Our engineers develop optimized tendon layouts and anchorage zones based on load requirements and span lengths.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12" >
              <div className="plans">
                <div className="y-box d-flex-all">
                  3.
                </div>
                <h3>Coordinated PT Layout</h3>
                <p>We produce detailed drawings showing duct paths, tendon profiles, and stressing points—ensuring clarity across all disciplines.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12" >
              <div className="plans">
                <div className="y-box d-flex-all">
                  4.
                </div>
                <h3>Quality Assurance</h3>
                <p>We oversee tendon installation, hydraulic stressing, and grouting, ensuring compliance with UAE safety and performance standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*About How It Works End */}

      {/*About Key Benefits Start */}
      <section className="gap about-key-benefits">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" >
              <div className="data">
                <figure>
                  <img className="w-100" src="/img/03_about.png" alt="About key Benefits" />
                </figure>
              </div>
            </div>
            <div className="col-lg-6" >
              <div className="data">
                <h2>Key Benefits of Post-Tensioning with Ferrigor</h2>
                <ul>
                  <li>
                    <i className="fa-solid fa-check" />
                    <div>
                      <p><strong>Reduced Labor Costs</strong></p>
                      <p>post-tensioned slabs require less formwork and reinforcement, leading to faster installation and lower labor expenses—ideal for Dubai’s fast-paced construction environment.</p>
                    </div>                    
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <div>
                      <p><strong>Efficient Material Management</strong></p>
                      <p> Our systems are designed with precise scheduling and tracking, ensuring tendons, anchors, and ducts are delivered and installed on time</p>
                    </div> 
                    
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <div>
                      <p><strong>Accelerated Construction Timelines</strong></p>
                      <p>post-tensioning allows for early stripping of formwork and faster floor cycles, helping developers meet tight deadlines without compromising quality.</p>
                    </div>
                    
                  </li>
                  <li>
                    <i className="fa-solid fa-check" />
                    <div>
                      <p><strong>Optimized Structural Performance</strong></p>
                      <p>With fewer columns and longer spans, post-tensioned designs offer greater flexibility and usable space—perfect for high-rise towers and podium slabs.</p>
                    </div>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*About Key Benefits End */}
          
    </Layouts>
  );
};
export default About;