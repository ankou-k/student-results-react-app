import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import '../index.css';

function HomePage() {
    return (
      <div>
        <Container className="vertical-center">
          <Row>
            <Col >
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="/">Homepage</Navbar.Brand>
              </Container>
            </Navbar>
            <br />
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="/students">Students Page</Navbar.Brand>
              </Container>
            </Navbar>
            <br />
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="/courses">Courses Page</Navbar.Brand>
              </Container>
            </Navbar>
            <br />
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="/results">
                  Results Page
                </Navbar.Brand>
              </Container>
            </Navbar>
            </Col>
            <Col>
            <main>
              <h1>Welcome to the Student Results Interactive App</h1>
            </main>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default HomePage;