import Box = require('./Box');
import Cube = require('./Cube');
import Point = require('./Point');
import CubePositionGenetator = require('./CubePositionGenetator');

var box = new Box();

var findNextCube = function(): boolean {
  var emptyPoints = box.getEmptyPoints();
  if (emptyPoints.length) {
    emptyPoints.forEach(function (emptyPoint) {
      var cubePositionGenetator = new CubePositionGenetator(emptyPoint);
      var cube:Cube;
      while (cube = cubePositionGenetator.getNextPosition()) {
        if (box.tryAddCube(cube)) {
          if (findNextCube()) {
            return true;
          }
          box.removeLastCube();
        }
      }
    });
    return false;
  }
  return true;
};

console.log(findNextCube());
console.log(box.print());
