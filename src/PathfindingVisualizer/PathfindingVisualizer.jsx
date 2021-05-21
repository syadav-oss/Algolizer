import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

const GridRowSize = 25;
const GridColSize = 50;
let StartNodeRow = 5;
let StartNodeCol = 5;
let EndNodeRow = 15;
let EndNodeCol = 17;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props); //Call Construct To Parent Class
    //props refer to the properties, special symbol. Used for passing data to one component to another
    this.state = {
      grid: [],
      startNodeChange: false,
      endNodeChange: false,
      mouseIsPressed: false,
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  componentDidMount() {
    const grid = constructGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    //console.log("Mouse Down", row, col);
    if (row === StartNodeRow && col === StartNodeCol) {
      this.startNodeChange = true;
      console.log("StartNodes", StartNodeRow, StartNodeCol);
    } else if (row === EndNodeRow && col === EndNodeCol) {
      this.endNodeChange = true;
    }
  }

  handleMouseEnter(row, col) {
    if (this.startNodeChange === true) {
      StartNodeRow = row;
      StartNodeCol = col;
      const newGrid = getNewGrid(this.state.grid);
      this.setState({
        grid: newGrid,
        startNodeChange: true,
        endNodeChange: false,
      });
    }
    if (this.endNodeChange === true) {
      EndNodeRow = row;
      EndNodeCol = col;
      const newGrid = getNewGrid(this.state.grid);
      this.setState({
        grid: newGrid,
        startNodeChange: false,
        endNodeChange: true,
      });
    }
  }
  handleMouseLeave(row, col) {}

  handleMouseUp(row, col) {
    if (this.startNodeChange === true) {
      this.startNodeChange = false;
    }
    if (this.endNodeChange === true) {
      this.endNodeChange = false;
    }

    const newGrid = getNewGrid(this.state.grid);
    this.setState({
      grid: newGrid,
      startNodeChange: false,
      endNodeChange: false,
    });
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#">Path Finding Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="nav" id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Algorithm" id="basic-nav-dropdown">
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
              <NavDropdown title="Mazes & Patterns" id="basic-nav-dropdown">
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
              <Nav.Link href="#add">Add Bomb</Nav.Link>
              <Button variant="outline-success">Visualise</Button>
              <Nav.Link href="#board">Clear Board</Nav.Link>
              <Nav.Link href="#wall">Clear Walls & Weights</Nav.Link>
              <Nav.Link href="#path">Clear Path</Nav.Link>
              <NavDropdown title="Speed" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Slow</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Average</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Fast</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Navbar bg="light" expand="lg" variant="light">
          <Navbar.Brand>Start Node</Navbar.Brand>
          <Navbar.Brand>Target Node</Navbar.Brand>
          <Navbar.Brand>Bomb Node</Navbar.Brand>
          <Navbar.Brand>Weight Node</Navbar.Brand>
          <Navbar.Brand>Unvisited Node</Navbar.Brand>
          <Navbar.Brand>Visited Node</Navbar.Brand>
          <Navbar.Brand>Shortest Path Node</Navbar.Brand>
          <Navbar.Brand>Wall Node</Navbar.Brand>
        </Navbar>

        <br />

        <div className="grid">
          {this.state.grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const { col, row, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeId}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown_={(row, col) =>
                        this.handleMouseDown(row, col)
                      }
                      onMouseUp_={(row, col) => this.handleMouseUp(row, col)}
                      onMouseEnter_={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseLeave_={(row, col) =>
                        this.handleMouseLeave(row, col)
                      }
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function constructGrid() {
  const grid = [];
  for (let r = 0; r < GridRowSize; ++r) {
    const row = [];
    for (let c = 0; c < GridColSize; ++c) {
      row.push(createNode(r, c));
    }
    grid.push(row);
  }
  return grid;
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isFinish: row === EndNodeRow && col === EndNodeCol,
    isStart: row === StartNodeRow && col === StartNodeCol,
    isWall: false,
  };
};

function getNewGrid(grid) {
  const newGrid = []; //assign complete old grid to newGrid
  for (let r = 0; r < GridRowSize; ++r) {
    const row = [];
    for (let c = 0; c < GridColSize; ++c) {
      row.push(createNode(r, c));
    }
    newGrid.push(row);
  }
  return newGrid;
}
