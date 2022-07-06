export default class Rect {
  public top: number = Infinity;
  public bottom: number = 0;
  public left: number = Infinity;
  public right: number = 0;

  constructor();
  constructor(left: number, right: number, width: number, height: number);
  constructor(
    left?: number | undefined,
    top?: number | undefined,
    width?: number | undefined,
    height?: number | undefined
  ) {
    if (left && top && width && height) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
    }
  }

  set width(val: number) {
    this.right = this.left + val;
  }

  get width(): number {
    return this.right - this.left;
  }

  set height(val: number) {
    this.bottom = this.top + val;
  }

  get height(): number {
    return this.bottom - this.top;
  }

  get ratio(): number {
    return this.bottom - this.top;
  }

  get size(): number {
    return this.width * this.height;
  }

  add(x: number, y: number): void {
    this.top = Math.min(this.top, y);
    this.bottom = Math.max(this.bottom, y + 1);
    this.left = Math.min(this.left, x);
    this.right = Math.max(this.right, x + 1);
  }

  intersect(rect: Rect) {
    const intersection = new Rect();
    let isIntersecting = !(
      rect.left > this.right ||
      rect.right < this.left ||
      rect.top > this.bottom ||
      rect.bottom < this.top
    );
    if (isIntersecting) {
      intersection.left = Math.max(this.left, rect.left);
      intersection.top = Math.max(this.top, rect.top);
      intersection.right = Math.min(this.right, rect.right);
      intersection.bottom = Math.min(this.bottom, rect.bottom);
    }
    return intersection;
  }

  merge(rect: Rect, strict: boolean = false): void {
    if (strict) {
      var intersection = this.intersect(rect);
      if (!intersection || intersection.size < this.size / 4) return;
    }
    this.top = Math.min(this.top, rect.top);
    this.bottom = Math.max(this.bottom, rect.bottom);
    this.left = Math.min(this.left, rect.left);
    this.right = Math.max(this.right, rect.right);
  }
}
