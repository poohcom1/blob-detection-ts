import Rect from "./Rect";

export default class Region {
  private parent: Region | undefined;
  private child: Region | undefined;
  private next: Region | undefined;

  constructor(
    public level: number,
    public moments = [0, 0, 0, 0, 0],
    public area = 0,
    public variation = Infinity,
    public stable = false,
    public rect = new Rect()
  ) {}

  accumulate(x: number, y: number): void {
    this.area += 1;
    this.moments[0] += x;
    this.moments[1] += y;
    this.moments[2] += x * x;
    this.moments[3] += x * y;
    this.moments[4] += y * y;
    this.rect.add(x, y);
  }

  merge(child: Region): void {
    this.area += child.area;
    this.moments[0] += child.moments[0];
    this.moments[1] += child.moments[1];
    this.moments[2] += child.moments[2];
    this.moments[3] += child.moments[3];
    this.moments[4] += child.moments[4];
    child.next = this.child;
    this.child = child;
    child.parent = this;
    this.rect.merge(child.rect);
  }

  process(
    delta: number,
    minArea: number,
    maxArea: number,
    maxVariation: number,
    minDiversity?: number
  ) {
    let parent: Region = this;
    while (parent.parent && parent.parent.level <= this.level + delta)
      parent = parent.parent;
    this.variation = (parent.area - this.area) / this.area;
    this.stable =
      this.area >= minArea &&
      this.area <= maxArea &&
      this.variation <= maxVariation;

    for (
      parent = this.parent!;
      parent && minDiversity && this.area > minDiversity * parent.area;
      parent = parent.parent!
    ) {
      if (parent.variation <= this.variation) this.stable = false;
      if (this.variation < parent.variation) parent.stable = false;
    }
    for (var child = this.child; child; child = child.next) {
      child.process(delta, minArea, maxArea, maxVariation);
    }
  }

  save(regions: Region[]): void {
    if (this.stable) regions.push(this);
    for (var child = this.child; child; child = child.next) {
      child.save(regions);
    }
  }

  getRect(): Rect {
    return this.rect;
  }
}
