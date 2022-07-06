export default class Rect {
    top: number;
    bottom: number;
    left: number;
    right: number;
    constructor();
    constructor(left: number, right: number, width: number, height: number);
    set width(val: number);
    get width(): number;
    set height(val: number);
    get height(): number;
    get ratio(): number;
    get size(): number;
    add(x: number, y: number): void;
    intersect(rect: Rect): Rect;
    merge(rect: Rect, strict?: boolean): void;
}
