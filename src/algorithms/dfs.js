// Performs Depth First Search algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

export function dfs(grid, startNode, finishNode) {
  const visitedNodesForAnimation = [];

  const nodesStack = [];
  nodesStack.push(startNode);
  // getAllFromGrid(grid);

  while (nodesStack.length) {
    const currentNode = nodesStack.pop();

    // If finish node then we reach the destination
    if (currentNode === finishNode) return visitedNodesForAnimation;

    if (!currentNode.isWall && !currentNode.isVisited) {
      currentNode.isVisited = true;
      visitedNodesForAnimation.push(currentNode);

      const { col, row } = currentNode;
      let nextNode;
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nodesStack.push(nextNode);
        }
      }
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nodesStack.push(nextNode);
        }
      }
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nodesStack.push(nextNode);
        }
      }
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited && !nextNode.isWall) {
          nextNode.previousNode = currentNode;
          nodesStack.push(nextNode);
        }
      }
    }
  }
  return visitedNodesForAnimation;
}
