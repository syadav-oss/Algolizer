import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";

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
    if (row === StartNodeRow && col === StartNodeCol) {
      this.startNodeChange = true;
    }
    if (row === EndNodeRow && col === EndNodeCol) {
      this.endNodeChange = true;
    }
  }
  handleMouseEnter(row, col) {
    if (this.startNodeChange === true) {
      StartNodeRow = row;
      StartNodeCol = col;
    }
    if (this.endNodeChange === true) {
      EndNodeRow = row;
      EndNodeCol = col;
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
    this.setState({ grid: newGrid });
  }

  render() {
    return (
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
                    onMouseDown_={(row, col) => this.handleMouseDown(row, col)}
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
