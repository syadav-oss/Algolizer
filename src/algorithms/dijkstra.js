// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

import { BinaryHeap } from "./binaryHeap";

function getHeap() {
  return new BinaryHeap(function (node) {
    return node.distance;
  });
}

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesForAnimation = [];
  var heap = getHeap();

  startNode.distance = 0;
  heap.push(startNode);

  while (heap.size() > 0) {
    var closestNode = heap.pop();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;

    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesForAnimation;

    // Else we visit this node and update/relax the distance of its neighbors
    closestNode.isVisited = true;
    visitedNodesForAnimation.push(closestNode);

    // If finish node then we reach the destination
    if (closestNode === finishNode) return visitedNodesForAnimation;

    const unvisitedNeighbors = getAllUnvisitedNeighbors(closestNode, grid);

    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.distance > closestNode.distance + 1) {
        neighbor.distance = closestNode.distance + 1;
        neighbor.previousNode = closestNode;
        if (heap.find(neighbor)) {
          heap.updateElement(neighbor);
        } else {
          heap.push(neighbor);
        }
      }
    }
  }

  return [];
}

function getAllUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
