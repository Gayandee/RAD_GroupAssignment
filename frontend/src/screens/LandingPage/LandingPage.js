import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingStyles.css";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/myrecipes");
      history.push("/mydiaries");
      history.push("/mygroceries");
      history.push("/myquestions");
    }
  }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Meal Planner</h1>
              <p className="subtitle">From Pantry to Plate: Your Ultimate Meal Planner.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
