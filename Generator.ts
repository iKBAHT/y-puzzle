import Box = require('./Box');
import Cube = require('./Cube');
import Point = require('./Point');
import CubePositionGenetator = require('./CubePositionGenetator');

var box = new Box();
//var totalVariants = 0;
//var totalExistVariants = 0;

var findNextCube = function(): boolean {
  var emptyPoints = box.getEmptyPoints();

  if (emptyPoints.length) {
    for (var i = 0; i < emptyPoints.length; ++i) {
      var emptyPoint = emptyPoints[i];
      var cubePositionGenetator = new CubePositionGenetator(emptyPoint);

      var cube:Cube;
      while (cube = cubePositionGenetator.getNextPosition()) {
        //totalExistVariants++;
        if (box.tryAddCube(cube)) {
          //totalVariants++;
          //if (totalVariants % 10000 === 0) {
          //  console.log(totalVariants);
          //}
          if (findNextCube()) {
            return true;
          }
          box.removeLastCube();
        }
      }
    }
    return false;
  }
  return true;
};
var result = findNextCube();
console.log(result);
//console.log(totalVariants);
//console.log(totalExistVariants);
box.print();
