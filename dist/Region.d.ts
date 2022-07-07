import Rect from "./Rect";
export default class Region {
    level: number;
    moments: number[];
    area: number;
    variation: number;
    stable: boolean;
    rect: Rect;
    private parent;
    private child;
    private next;
    constructor(level: number, moments?: number[], area?: number, variation?: number, stable?: boolean, rect?: Rect);
    accumulate(x: number, y: number): void;
    merge(child: Region): void;
    process(delta: number, minArea: number, maxArea: number, maxVariation: number, minDiversity?: number): void;
    save(regions: Region[]): void;
    getRect(): Rect;
}
