import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/get-started');
  };

  return (
    <Container fluid className="hero-section">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to Hackathon Open Platform</h1>
          <p>Your gateway to a world of coding challenges and collaboration!</p>
          <Button variant="primary" size="lg" onClick={handleGetStarted}>Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
