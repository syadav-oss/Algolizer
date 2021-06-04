import React, { Component } from "react";
import "./ControlPanel.css";

import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onClickClear_, onClickVisualize_ } = this.props;

    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark" className="logo">
          <Navbar.Brand href="#" className="ml-5">
            Path Finding Visualizer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="nav" id="basic-navbar-nav">
            <Nav className="mr-auto col-centered1">
              <NavDropdown
                title="Algorithm"
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item href="#action/3.1">
                  Dijkstra's Algorithm
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  A* Algorithm
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">
                  Depth-First Search
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Breadth-First Search
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Mazes & Patterns"
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item href="#action/3.1">
                  Recursive Division
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Basic Random Maze
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Simple Stair Pattern
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#add" className="mr-3">
                Add Bomb
              </Nav.Link>
              <Button
                variant="outline-success"
                className="mr-3"
                onClick={() => onClickVisualize_()}
              >
                Visualise
              </Button>
              <Nav.Link
                href="#"
                onClick={() => onClickClear_()}
                className="mr-3"
              >
                Clear Board
              </Nav.Link>
              <Nav.Link href="#wall" className="mr-3">
                Clear Walls & Weights
              </Nav.Link>
              <Nav.Link href="#path" className="mr-3">
                Clear Path
              </Nav.Link>
              <NavDropdown
                title="Speed"
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item href="#action/3.1">Slow</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Average</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Fast</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Navbar bg="light" expand="lg" variant="light">
          <Navbar.Brand className="col-centered">Start Node</Navbar.Brand>
          <Navbar.Brand>Target Node</Navbar.Brand>
          <Navbar.Brand>Bomb Node</Navbar.Brand>
          <Navbar.Brand>Weight Node</Navbar.Brand>
          <Navbar.Brand>Unvisited Node</Navbar.Brand>
          <Navbar.Brand>Visited Node</Navbar.Brand>
          <Navbar.Brand>Shortest Path Node</Navbar.Brand>
          <Navbar.Brand>Wall Node</Navbar.Brand>
        </Navbar>

        <br />
      </div>
    );
  }
}
