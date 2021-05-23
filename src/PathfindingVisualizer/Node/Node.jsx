import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: 0,
      row: 0,
      isFinish: false,
      isStart: false,
      isWall: false,
      extraClassName: "",
    };
    this.state = {};
  }

  componentDidMount() {
    const { col, row, isFinish, isStart, isWall } = this.props;

    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    this.setState({
      col: col,
      row: row,
      isFinish: isFinish,
      isStart: isStart,
      isWall: isWall,
      extraClassName: extraClassName,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const extraClassName = nextProps.isFinish
      ? "node-finish"
      : nextProps.isStart
      ? "node-start"
      : nextProps.isWall
      ? "node-wall"
      : "";

    if (
      prevState.col !== nextProps.col ||
      prevState.row !== nextProps.row ||
      prevState.isFinish !== nextProps.isFinish ||
      prevState.isStart !== nextProps.isStart ||
      prevState.isWall !== nextProps.isWall ||
      prevState.extraClassName !== extraClassName
    ) {
      return {
        col: nextProps.col,
        row: nextProps.row,
        isFinish: nextProps.isFinish,
        isStart: nextProps.isStart,
        isWall: nextProps.isWall,
        extraClassName: extraClassName,
      };
    }
    return null;
  }

  // modifyState(col, row, isFinish, isStart, isWall) {
  //   // console.log("Modify State for", col, row);
  //   const extraClassName = isFinish
  //     ? "node-finish"
  //     : isStart
  //     ? "node-start"
  //     : isWall
  //     ? "node-wall"
  //     : "";
  //   //console.log(this.state.col, col, this.state.row, row);

  //   this.state.col = col;
  //   this.state.row = row;
  //   this.state.isFinish = isFinish;
  //   this.state.isStart = isStart;
  //   this.state.isWall = isWall;
  //   this.state.extraClassName = extraClassName;
  // }

  render() {
    const { onMouseDown_, onMouseUp_, onMouseEnter_, onMouseLeave_ } =
      this.props;

    return (
      <div
        id={`node-${this.state.row}-${this.state.col}`}
        className={`node ${this.state.extraClassName}`}
        onMouseDown={() => onMouseDown_(this.state.row, this.state.col)}
        onMouseUp={() => onMouseUp_(this.state.row, this.state.col)}
        onMouseEnter={() => onMouseEnter_(this.state.row, this.state.col)}
        onMouseLeave={() => onMouseLeave_(this.state.row, this.state.col)}
      ></div>
    );
  }
}

//Note ` ` (backtick) are used for Template Literals
/*
      Template literals can be used to represent multi-line strings and 
      may use "interpolation" to insert variables:
      */
