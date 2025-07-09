class KnightTravails {
  constructor(start, end) {
    this.knightMoves = this.knightMoves(start,end);
  }

  coordinates(index) {
    const coordinates = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]    
    ];

    let queue = [];

    for (let [coordX, coordY] of coordinates) {
      let x = index[0];
      let y = index[1];

      let nextX = x + coordX;
      let nextY = y + coordY;

      if (nextX >= 0 && nextX <= 7 && nextY >=0 && nextY <= 7) {
        queue.push([nextX, nextY])
      }
    }
    return queue;
  }

  knightMoves(start, end) {
    const queue = [[start]];

    while (queue.length > 0) {
      const path = queue.shift()
      const current = path[path.length - 1]
      if (current[0] === end[0] && current[1] === end[1]) return path;

      for (let move of this.coordinates(current)) {
        const newCoordinate = [...path,move];
        queue.push(newCoordinate)
      }
    }
  }
}

let test = new KnightTravails([0,0], [7,7])

console.log(`=> You made it in ${test.knightMoves.length - 1} moves! Here's your path:`, test);

