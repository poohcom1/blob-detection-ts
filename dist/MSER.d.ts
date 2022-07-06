import Rect from "./Rect";
import Region from "./Region";
interface MSEROptions {
    delta: number;
    minArea: number;
    maxArea: number;
    maxletiation: number;
    minDiversity: number;
}
export default class MSER {
    private options;
    eight: boolean;
    constructor(options?: MSEROptions);
    mergeRects(rects: Rect[]): Rect[];
    drawRectSolid(rect: Rect, rgba: RGBA, imgData: ImageData): void;
    drawRectOutline(rect: Rect, rgba: RGBA, imgData: ImageData): void;
    extract(imageData: ImageData): Region[];
}
export {};
