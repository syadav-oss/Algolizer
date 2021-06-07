export function RecursiveDivision(grid) {
  let order = [];
  let holes = [];

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function checkInside(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].row === element[0] && array[i].col === element[1]) {
        return true;
      }
    }
    return false;
  }

  function addHorizontalWall(minX, maxX, y) {
    // On this element there will not be a wall it is randomly selected
    var hole = Math.floor(randomNumber(minX, maxX)) + 1;
    holes.push([hole, y]);
    // Adding Walls On the line other than the hole
    for (var i = minX; i <= maxX; i++) {
      if (i !== hole && !checkInside(holes, [i, y])) order.push(grid[i][y]);
    }
  }

  function addVerticalWall(minY, maxY, x) {
    // On this element there will not be a wall it is randomly selected
    var hole = Math.floor(randomNumber(minY, maxY)) + 1;
    holes.push([x, hole]);
    // Adding Walls On the line other than the hole
    for (var i = minY; i <= maxY; i++) {
      if (i !== hole && !checkInside(holes, [x, hole])) order.push(grid[x][i]);
    }
  }

  function divide(grid, horizontal, start, end) {
    let diff = [end[0] - start[0], end[1] - start[1]];

    if (horizontal) {
      if (diff[0] < 1) {
        return;
      }
      var y = Math.floor(randomNumber(start[1], end[1]));
      addHorizontalWall(start[0], end[0], y);
      divide(grid, !horizontal, start, [end[0], y - 1]);
      divide(grid, !horizontal, [start[0], y + 1], end);
    } else {
      if (diff[1] < 1) {
        return;
      }
      var x = Math.floor(randomNumber(start[0], end[0]));
      addVerticalWall(start[1], end[1], x);
      divide(grid, !horizontal, start, [x - 1, end[1]]);
      divide(grid, !horizontal, [x + 1, start[1]], end);
    }
  }

  // Range is from starting to end of maze
  divide(grid, false, [0, 0], [grid.length - 1, grid[0].length - 1]);
  return order;
}
