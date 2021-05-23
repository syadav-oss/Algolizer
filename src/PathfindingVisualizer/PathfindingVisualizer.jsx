import React, { Component } from "react";
import Node from "./Node/Node";
import ControlPanel from "./ControlPanel/ControlPanel";
import "./PathfindingVisualizer.css";

let StartNodeRow = 5;
let StartNodeCol = 5;
let EndNodeRow = 15;
let EndNodeCol = 45;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props); //Call Construct To Parent Class
    //props refer to the properties, special symbol. Used for passing data to one component to another
    this.state = {
      grid: [],
      GridRowSize: 21,
      GridColSize: 60,
      startNodeChange: false,
      endNodeChange: false,
      mouseIsPressed: false,
      wallNodeChange: false,
    };
  }

  // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  // Initialization that requires DOM nodes should go here.
  componentDidMount() {
    const grid = initializeGrid(this.state.GridRowSize, this.state.GridColSize);
    this.setState({ grid: grid });
  }

  changeState = (row, col, isFinish, isStart, isWall, extraClassName) => {
    const node = this.state.grid[row][col];
    node.isFinish = isFinish;
    node.isStart = isStart;
    node.isWall = isWall;
    const element = document.getElementById(`node-${node.row}-${node.col}`);
    element.className = `node ${extraClassName}`;
    element.isFinish = isFinish;
    element.isStart = isStart;
    element.isWall = isWall;
    element.extraClassName = extraClassName;
    return;
  };

  handleMouseDown(row, col) {
    //console.log("Mouse Down", row, col);
    if (row === StartNodeRow && col === StartNodeCol) {
      this.startNodeChange = true;
    } else if (row === EndNodeRow && col === EndNodeCol) {
      this.endNodeChange = true;
    } else {
      this.wallNodeChange = true;
      const node = this.state.grid[row][col];
      let className = "node-wall";
      if (node.isWall) className = "";
      this.changeState(row, col, false, false, !node.isWall, className);
    }
  }

  handleMouseEnter(row, col) {
    const node = this.state.grid[row][col];
    if (this.startNodeChange === true && node.isWall === false) {
      this.changeState(row, col, false, true, false, "node-start");
      StartNodeRow = row;
      StartNodeCol = col;
    } else if (this.endNodeChange === true && node.isWall === false) {
      this.changeState(row, col, true, false, false, "node-finish");
      EndNodeRow = row;
      EndNodeCol = col;
    } else if (
      !node.isFinish &&
      !node.isStart &&
      this.wallNodeChange === true
    ) {
      let className = "node-wall";
      if (node.isWall) className = "";
      this.changeState(row, col, false, false, !node.isWall, className);
    }
  }
  handleMouseLeave(row, col) {
    const node = this.state.grid[row][col];
    if (this.startNodeChange === true && node.isWall === false) {
      this.changeState(row, col, false, false, false, "node ");
    }

    if (this.endNodeChange === true && node.isWall === false) {
      this.changeState(row, col, false, false, false, "node ");
    }
  }

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
  }

  render() {
    return (
      <div>
        <ControlPanel></ControlPanel>
        <div className="grid">
          {this.state.grid.map((row, rowId) => {
            return (
              <div key={rowId} className="mar">
                {row.map((node, nodeId) => {
                  const { col, row, isFinish, isStart, isWall, refElement } =
                    node;
                  return (
                    <Node
                      ref={refElement}
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

function initializeGrid(GridRowSize, GridColSize) {
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
    refElement: React.createRef(),
  };
};
