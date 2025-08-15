import Head from 'next/head';
import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import CareerSection from "@components/CareerSection";

export default function Careers() {
  return (
    <Layouts>
      <PageBanner pageTitle={"Careers"} pageDesc={"Join our team"} />
      <Head>
        <title>Careers</title>
      </Head>
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-8 mx-auto text-center">
              <h1 className="display-5 fw-bold">Join Our Post-Tensioning Team</h1>
              <p className="lead text-muted">
                Shape the future of civil engineering with precision and innovation. Explore career opportunities in post-tensioned concrete systems and become part of a team that builds smarter, stronger, and safer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CareerSection />
    </Layouts>
  );
}