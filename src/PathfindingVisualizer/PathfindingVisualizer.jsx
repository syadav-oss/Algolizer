import React, { Component } from "react";
import Node from "./Node/Node";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props); //Call Construct To Parent Class
    //props refer to the properties, special symbol. Used for passing data to one component to another
    this.state = {};
  }
  render() {
    return (
      <div>
        <Node></Node>
        <h1>Start</h1>
      </div>
    );
  }
}
