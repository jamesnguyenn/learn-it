import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function About() {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button
          variant="primary"
          href="http://james-cv.surge.sh/"
          target="_blank"
          size="lg"
        >
          Visit my portfolio for more information
        </Button>
      </Col>
    </Row>
  );
}

export default About;
