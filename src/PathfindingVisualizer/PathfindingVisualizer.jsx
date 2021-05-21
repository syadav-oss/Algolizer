import React, { Component } from "react";
import Node from "./Node/Node";
import ControlPanel from "./ControlPanel/ControlPanel";
import "./PathfindingVisualizer.css";

let StartNodeRow = 5;
let StartNodeCol = 5;
let EndNodeRow = 15;
let EndNodeCol = 15;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props); //Call Construct To Parent Class
    //props refer to the properties, special symbol. Used for passing data to one component to another
    this.state = {
      grid: [],
      wallGrid: [],
      GridRowSize: 20,
      GridColSize: 50,
      startNodeChange: false,
      endNodeChange: false,
      mouseIsPressed: false,
      wallNodeChange: false,
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  componentDidMount() {
    const grid = constructGrid(this.state.GridRowSize, this.state.GridColSize);
    const wallGrid = initializeWall(
      this.state.GridRowSize,
      this.state.GridColSize
    );
    this.setState({ grid: grid, wallGrid: wallGrid });
  }

  handleMouseDown(row, col) {
    //console.log("Mouse Down", row, col);
    if (row === StartNodeRow && col === StartNodeCol) {
      this.startNodeChange = true;
      console.log("StartNodes", StartNodeRow, StartNodeCol);
    } else if (row === EndNodeRow && col === EndNodeCol) {
      this.endNodeChange = true;
    } else {
      this.wallNodeChange = true;
      this.state.wallGrid[row][col] = !this.state.wallGrid[row][col];
    }
  }

  handleMouseEnter(row, col) {
    if (
      this.startNodeChange === true &&
      this.state.wallGrid[row][col] === false
    ) {
      StartNodeRow = row;
      StartNodeCol = col;
      const newGrid = getNewGrid(
        this.state.grid,
        this.state.wallGrid,
        this.state.GridRowSize,
        this.state.GridColSize
      );
      this.setState({
        grid: newGrid,
        startNodeChange: true,
        endNodeChange: false,
      });
    }
    if (
      this.endNodeChange === true &&
      this.state.wallGrid[row][col] === false
    ) {
      EndNodeRow = row;
      EndNodeCol = col;
      const newGrid = getNewGrid(
        this.state.grid,
        this.state.wallGrid,
        this.state.GridRowSize,
        this.state.GridColSize
      );
      this.setState({
        grid: newGrid,
        startNodeChange: false,
        endNodeChange: true,
      });
    } else if (this.wallNodeChange === true) {
      this.state.wallGrid[row][col] = !this.state.wallGrid[row][col];

      const newGrid = getNewGrid(
        this.state.grid,
        this.state.wallGrid,
        this.state.GridRowSize,
        this.state.GridColSize
      );
      this.setState({
        grid: newGrid,
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
    if (this.wallNodeChange === true) {
      this.wallNodeChange = false;
    }

    const newGrid = getNewGrid(
      this.state.grid,
      this.state.wallGrid,
      this.state.GridRowSize,
      this.state.GridColSize
    );
    this.setState({
      grid: newGrid,
      startNodeChange: false,
      endNodeChange: false,
      wallNodeChange: false,
    });
  }

  render() {
    return (
      <div>
        <ControlPanel></ControlPanel>
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

function constructGrid(GridRowSize, GridColSize) {
  const grid = [];
  for (let r = 0; r < GridRowSize; ++r) {
    const row = [];
    for (let c = 0; c < GridColSize; ++c) {
      row.push(createNode(r, c, false));
    }
    grid.push(row);
  }
  return grid;
}

function initializeWall(GridRowSize, GridColSize) {
  const wallGrid = [];
  for (let i = 0; i < GridRowSize; ++i) {
    let row = [];
    for (let j = 0; j < GridColSize; ++j) {
      row.push(false);
    }
    wallGrid.push(row);
  }
  return wallGrid;
}

const createNode = (row, col, isWall) => {
  return {
    col,
    row,
    isFinish: row === EndNodeRow && col === EndNodeCol,
    isStart: row === StartNodeRow && col === StartNodeCol,
    isWall: isWall,
  };
};

function getNewGrid(grid, wallGrid, GridRowSize, GridColSize) {
  const newGrid = []; //assign complete old grid to newGrid
  for (let r = 0; r < GridRowSize; ++r) {
    const row = [];
    for (let c = 0; c < GridColSize; ++c) {
      row.push(createNode(r, c, wallGrid[r][c]));
    }
    newGrid.push(row);
  }
  return newGrid;
}
