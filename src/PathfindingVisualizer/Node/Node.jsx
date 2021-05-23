import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      col,
      row,
      isFinish,
      isStart,
      isWall,
      onMouseDown_,
      onMouseUp_,
      onMouseEnter_,
      onMouseLeave_,
    } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown_(row, col)}
        onMouseUp={() => onMouseUp_(row, col)}
        onMouseEnter={() => onMouseEnter_(row, col)}
        onMouseLeave={() => onMouseLeave_(row, col)}
      ></div>
    );
  }
}

//Note ` ` (backtick) are used for Template Literals
/*
      Template literals can be used to represent multi-line strings and 
      may use "interpolation" to insert variables:
      */
