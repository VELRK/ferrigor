import Head from 'next/head';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import dynamic from "next/dynamic";
import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";

const jobs = [
  { title: "Technical Marketing Specialist – Post-Tensioning Solutions", location: "Dubai, UAE", type: "Full Time", description: "Promote post-tensioning technologies, create technical content, and engage with clients and consultants.", apply: "mailto:careers@ferrigor.com?subject=Technical Marketing Specialist – Post-Tensioning Solutions" },
  {
    title: "Post-Tensioning Project Manager",
    location: "Dubai, UAE",
    type: "Full Time",
    description: "Lead post-tensioning projects, coordinate with design and site teams, and ensure compliance with international standards.",
    apply: "mailto:careers@ferrigor.com?subject=Post-Tensioning Project Manager"
  },
  {
    title: "Post-Tensioning Site Engineer",
    location: "Dubai, UAE",
    type: "Full Time",
    description: "Supervise tendon installation, stressing operations, and quality control on post-tensioned slabs and structures",
    apply: "mailto:careers@ferrigor.com?subject=Post-Tensioning Site Engineer"
  },
  {
    title: "Design Engineer – Post-Tensioning Systems",
    location: "Dubai, UAE/ Coimbatore",
    type: "Full Time",
    description: "Design post-tensioned slabs and beams using structural software, prepare calculations, and collaborate with drafting and site teams.",
    apply: "mailto:careers@ferrigor.com?subject=Design Engineer – Post-Tensioning Systems"
  },
  {
    title: "Drafting engineer– Structural Detailing",
    location: "Dubai, UAE/ Coimbatore",
    type: "Full Time",
    description: "Prepare detailed post-tensioning layout drawings, tendon profiles, and anchor locations using AutoCAD.",
    apply: "mailto:careers@ferrigor.com?subject=Drafting engineer– Structural Detailing"
  },
   
    {
    title: "Site Supervisor – Post-Tensioning Works",
    location: "On-Site (UAE Projects)",
    type: "Full Time",
    description: "Manage on-site activities, coordinate with contractors, ensure safety compliance, and oversee stressing and grouting operations.",
    apply: "mailto:careers@ferrigor.com?subject=Site Supervisor – Post-Tensioning Works"
  },


];

export default function Careers() {
  return (
    <Layouts>
          <PageBanner pageTitle={"Careers"} pageDesc={"Join our team"} />
      <Head>
        <title>Careers</title>
      </Head>
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <Row className="mb-4">
            <Col md={8} className="mx-auto text-center">
              <h1 className="display-5 fw-bold">Join Our Post-Tensioning Team</h1>
              <p className="lead text-muted">
                Shape the future of civil engineering with precision and innovation. Explore career opportunities in post-tensioned concrete systems and become part of a team that builds smarter, stronger, and safer.
              </p>
            </Col>
          </Row>
          <Row>
            {jobs.map((job, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fw-bold">{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.location} &bull; {job.type}</Card.Subtitle>
                    <Card.Text>{job.description}</Card.Text>
                    <Button variant="primary" href={job.apply}>Apply Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Layouts>
  );
}