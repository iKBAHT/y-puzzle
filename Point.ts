class Point {
  x: number;
  y: number;
  z: number;
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  getDistance(point: Point): number {
    return Math.sqrt(
      Math.pow(this.x - point.x, 2) +
      Math.pow(this.y - point.y, 2) +
      Math.pow(this.z - point.z, 2)
    );
  }
  isDifferenceOnlyInOneCoordinate(point: Point): boolean {
    try {
      this.inWhatCooordinateDifference(point);
      return true;
    } catch (ex) {
      return false;
    }
  }
  inWhatCooordinateDifference(point: Point): string {
    var deltaX = this.x - point.x;
    var deltaY = this.y - point.y;
    var deltaZ = this.z - point.z;
    if (deltaX !== 0 && deltaY === 0 && deltaZ === 0) {
      return 'x';
    }
    if (deltaX === 0 && deltaY !== 0 && deltaZ === 0) {
      return 'y';
    }
    if (deltaX === 0 && deltaY === 0 && deltaZ !== 0) {
      return 'z';
    }
    throw 'difference in more than one coordinate';
  }
  print() {
    console.log('x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z);
  }
}

export  = Point;