import Cube = require('./Cube');
import Point = require('./Point');

class CubePositionGenetator {
  private point: Point;
  private cubePositions: Array<Cube>;
  constructor(point: Point) {
    this.point = point;
    this.generateRotationsNearStartPoint();
  }
  getNextPosition(): Cube {
    return this.cubePositions.shift();
  }
  generateRotationsNearStartPoint() {
    var startPoint = this.point;
    this.cubePositions = [];
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x + Cube.Size, this.point.y, this.point.z));
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x - Cube.Size, this.point.y, this.point.z));
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x, this.point.y + Cube.Size, this.point.z));
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x, this.point.y - Cube.Size, this.point.z));
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x, this.point.y, this.point.z + Cube.Size));
    this.addCubeRotationsByStartAndEnd(startPoint, new Point(this.point.x, this.point.y, this.point.z - Cube.Size));

    this.addCubeRotationsByStartAndLedge(new Point(this.point.x - 1, this.point.y - 1, this.point.z), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x + 1, this.point.y - 1, this.point.z), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x + 1, this.point.y + 1, this.point.z), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x - 1, this.point.y + 1, this.point.z), this.point);

    this.addCubeRotationsByStartAndLedge(new Point(this.point.x - 1, this.point.y, this.point.z - 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x + 1, this.point.y, this.point.z - 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x + 1, this.point.y, this.point.z + 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x - 1, this.point.y, this.point.z + 1), this.point);

    this.addCubeRotationsByStartAndLedge(new Point(this.point.x, this.point.y - 1, this.point.z - 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x, this.point.y + 1, this.point.z - 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x, this.point.y + 1, this.point.z + 1), this.point);
    this.addCubeRotationsByStartAndLedge(new Point(this.point.x, this.point.y - 1, this.point.z + 1), this.point);
  }
  addCubeRotationsByStartAndEnd(startPoint, endPoint){
    for(var i = 0; i < 4; ++i) {
      this.cubePositions.push(new Cube(startPoint, endPoint, i));
      this.cubePositions.push(new Cube(endPoint, startPoint, i));
    }
  }
  addCubeRotationsByStartAndLedge(startPoint, ledgePoint) {
    var endPoint1: Point;
    var endPoint2: Point;
    var deltaX = getShift(startPoint.x - ledgePoint.x) * Cube.Size;
    var deltaY = getShift(startPoint.y - ledgePoint.y) * Cube.Size;
    var deltaZ = getShift(startPoint.z - ledgePoint.z) * Cube.Size;

    if (deltaX == 0) {
      endPoint1 = new Point(startPoint.x, startPoint.y + deltaY, startPoint.z);
      endPoint2 = new Point(startPoint.x, startPoint.y, startPoint.z + deltaZ);
    } else if (deltaY === 0) {
      endPoint1 = new Point(startPoint.x + deltaX, startPoint.y, startPoint.z);
      endPoint2 = new Point(startPoint.x, startPoint.y, startPoint.z + deltaZ);
    } else if (deltaZ ===0 ) {
      endPoint1 = new Point(startPoint.x + deltaX, startPoint.y, startPoint.z);
      endPoint2 = new Point(startPoint.x, startPoint.y + deltaY, startPoint.z);
    } else {
      throw 'wrong start and ledge points';
    }

    this.cubePositions.push(new Cube(startPoint, endPoint1, ledgePoint));
    this.cubePositions.push(new Cube(startPoint, endPoint2, ledgePoint));
  }
}

var getShift = function(num: number): number {
  if (num > 0) {
    return 1;
  }
  if (num < 0) {
    return -1;
  }
  return 0;
};

export = CubePositionGenetator;