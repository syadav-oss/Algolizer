import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";

const GridRowSize = 25;
const GridColSize = 50;
const StartNodeRow = 5;
const StartNodeCol = 5;
const EndNodeRow = 15;
const EndNodeCol = 17;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props); //Call Construct To Parent Class
    //props refer to the properties, special symbol. Used for passing data to one component to another
    this.state = {
      grid: [],
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  componentDidMount() {
    const grid = constructGrid();
    this.setState({ grid });
  }

  render() {
    return (
      <div className="grid">
        {this.state.grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeId}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
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
    isFinish: row == EndNodeRow && col == EndNodeCol,
    isStart: row == StartNodeRow && col == StartNodeCol,
    isWall: false,
  };
};
