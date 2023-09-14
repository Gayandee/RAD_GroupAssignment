import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Meal Planner - 21001537 | 21000409 | 21000891 | 21001561 | 21001952</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
