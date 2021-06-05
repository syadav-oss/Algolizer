import React, { Component } from "react";
import "./ControlPanel.css";
import startSvg from "../Styling/start.svg";
import endSvg from "../Styling/end.svg";
import stationSvg from "../Styling/station.svg";

import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      onClickClear_,
      onClickVisualize_,
      onClickSelect_,
      onClickAddStation_,
    } = this.props;

    return (
      <div>
        <Navbar expand="lg" variant="dark" className="logo">
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
                <NavDropdown.Item
                  href="#Dijkstra"
                  onClick={() => onClickSelect_(1)}
                >
                  Dijkstra's Algorithm
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#AStar"
                  onClick={() => onClickSelect_(2)}
                >
                  A* Algorithm
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#DFS" onClick={() => onClickSelect_(3)}>
                  Depth-First Search
                </NavDropdown.Item>
                <NavDropdown.Item href="#BFS" onClick={() => onClickSelect_(4)}>
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
              <Nav.Link
                href="#add"
                className="mr-3"
                onClick={() => onClickAddStation_()}
              >
                Add Station
              </Nav.Link>
              <Button
                id="visualise-button"
                variant="outline-primary"
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

        <Navbar bg="light" expand="lg" variant="light" className="centered">
          <Navbar.Brand>
            <img
              alt=""
              src={startSvg}
              width="25"
              height="25"
              className="d-inline-block align-top"
              style={{ marginRight: "10px" }}
            />
            {""}
            Start Node
          </Navbar.Brand>
          <Navbar.Brand>
            <img
              alt=""
              src={endSvg}
              width="25"
              height="25"
              className="d-inline-block align-top"
              style={{ marginRight: "10px" }}
            />{" "}
            Target Node
          </Navbar.Brand>
          <Navbar.Brand>
            <img
              alt=""
              src={stationSvg}
              width="25"
              height="25"
              className="d-inline-block align-top"
              style={{ marginRight: "10px" }}
            />{" "}
            Station Node
          </Navbar.Brand>
          <Navbar.Brand>
            <div className="d-flex flex-row">
              <div
                className="p-2"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: `rgb(12, 53, 71)`,
                  marginRight: "10px",
                }}
              />
              Weight Node
            </div>
          </Navbar.Brand>
          <Navbar.Brand>
            <div className="d-flex flex-row">
              <div
                className="p-2"
                style={{
                  width: "25px",
                  height: "25px",
                  outline: "1px solid rgb(175, 216, 248)",
                  backgroundColor: `rgb(255, 255, 255)`,
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
              Unvisited Node
            </div>{" "}
          </Navbar.Brand>

          <Navbar.Brand>
            <div className="d-flex flex-row">
              <div
                className="p-2"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: `rgba(0, 218, 207, 0.75)`,
                  marginRight: "10px",
                }}
              />
              Visited Node
            </div>
          </Navbar.Brand>
          <Navbar.Brand>
            <div className="d-flex flex-row">
              <div
                className="p-2"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: `rgba(112, 0, 217, 0.75)`,
                  marginRight: "10px",
                }}
              />
              Shortest Path Node
            </div>
          </Navbar.Brand>
          <Navbar.Brand>
            <div className="d-flex flex-row">
              <div
                className="p-2"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: `rgb(12, 53, 71)`,
                  marginRight: "10px",
                }}
              />
              Wall Node
            </div>
          </Navbar.Brand>
        </Navbar>

        <br />
      </div>
    );
  }
}
