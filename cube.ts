import Point = require('./Point');

class Cube {
  static Size = 3;
  static DistanceBetweenLedgeAndStart = Math.sqrt(2);
  startPoint: Point;
  endPoint: Point;
  ledgePoint: Point;
  constructor(startPoint: Point, endPoint: Point, arg: any) {
    Cube.checkStartAndEndPoints(startPoint, endPoint);
    if (arg instanceof Point) {
      this.createByTreePoint(startPoint, endPoint, arg);
    } else {
      this.createByTwoPointAndType(startPoint, endPoint, arg);
    }
  }
  createByTreePoint(startPoint: Point, endPoint: Point, ledgePoint: Point) {
    if (Math.abs(startPoint.getDistance(ledgePoint) - Cube.DistanceBetweenLedgeAndStart) > 0.001) {
      throw 'incorrect cube points: startPoint and ledge is not on one plane'
    }
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.ledgePoint = ledgePoint;
  }
  createByTwoPointAndType(startPoint: Point, endPoint: Point, type: number){
    if (type > 3) {
      throw 'incorrect type argument'
    }
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    var diffCoor = startPoint.inWhatCooordinateDifference(endPoint);
    var direction: number;
    switch (diffCoor) {
      case 'x':
        direction = startPoint.x - endPoint.x < 0? 1: -1;
        switch (type){
          case 0:
            this.ledgePoint = new Point(startPoint.x + direction, startPoint.y, startPoint.z + 1);
            break;
          case 1:
            this.ledgePoint = new Point(startPoint.x + direction, startPoint.y - 1, startPoint.z);
            break;
          case 2:
            this.ledgePoint = new Point(startPoint.x + direction, startPoint.y, startPoint.z - 1);
            break;
          case 3:
            this.ledgePoint = new Point(startPoint.x + direction, startPoint.y + 1, startPoint.z);
        }
        break;
      case 'y':
        direction = startPoint.y - endPoint.y < 0? 1: -1;
        switch (type){
          case 0:
            this.ledgePoint = new Point(startPoint.x, startPoint.y + direction, startPoint.z + 1);
            break;
          case 1:
            this.ledgePoint = new Point(startPoint.x + 1, startPoint.y + direction, startPoint.z);
            break;
          case 2:
            this.ledgePoint = new Point(startPoint.x, startPoint.y + direction, startPoint.z - 1);
            break;
          case 3:
            this.ledgePoint = new Point(startPoint.x - 1, startPoint.y + direction, startPoint.z);
        }
        break;
      case 'z':
        direction = startPoint.z - endPoint.z < 0? 1: -1;
        switch (type){
          case 0:
            this.ledgePoint = new Point(startPoint.x, startPoint.y - 1, startPoint.z + direction);
            break;
          case 1:
            this.ledgePoint = new Point(startPoint.x + 1, startPoint.y, startPoint.z + direction);
            break;
          case 2:
            this.ledgePoint = new Point(startPoint.x, startPoint.y + 1, startPoint.z + direction);
            break;
          case 3:
            this.ledgePoint = new Point(startPoint.x - 1, startPoint.y, startPoint.z + direction);
        }
    }
  }
  print() {
    this.startPoint.print();
    this.endPoint.print();
    this.ledgePoint.print();
  }
  getAllPoints(): Point[] {
    var points: Point[] = [];
    points.push(this.startPoint);
    var diffCoor = this.startPoint.inWhatCooordinateDifference(this.endPoint);
    var direction: number;

    switch (diffCoor) {
      case 'x':
        direction = this.startPoint.x - this.endPoint.x < 0? 1: -1;
        points.push(new Point(this.startPoint.x + direction, this.startPoint.y, this.startPoint.z));
        points.push(new Point(this.startPoint.x + direction*2, this.startPoint.y, this.startPoint.z));
        break;
      case 'y':
        direction = this.startPoint.y - this.endPoint.y < 0? 1: -1;
        points.push(new Point(this.startPoint.x, this.startPoint.y + direction, this.startPoint.z));
        points.push(new Point(this.startPoint.x, this.startPoint.y + direction*2, this.startPoint.z));
        break;
      case 'z':
        direction = this.startPoint.z - this.endPoint.z < 0? 1: -1;
        points.push(new Point(this.startPoint.x, this.startPoint.y, this.startPoint.z + direction));
        points.push(new Point(this.startPoint.x, this.startPoint.y, this.startPoint.z + direction*2));
        break;
    }
    points.push(this.endPoint);
    points.push(this.ledgePoint);
    return points;
  }
  static checkStartAndEndPoints(startPoint: Point, endPoint: Point){
    if (startPoint.getDistance(endPoint) !== Cube.Size) {
      throw 'incorrect cube points: wrong distance between startPoint and endPoint';
    }
    if (!startPoint.isDifferenceOnlyInOneCoordinate(endPoint)) {
      throw 'incorrect cube points: startPoint and endPoint is not on one plane';
    }
  }
}

export = Cube;