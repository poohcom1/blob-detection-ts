import Rect from "./Rect";
import Region from "./Region";
export interface MSEROptions {
    delta: number;
    minArea: number;
    maxArea: number;
    maxVariation: number;
    minDiversity: number;
}
export default class MSER {
    private options;
    eight: boolean;
    constructor(options?: MSEROptions);
    mergeRects(rects: Rect[]): Rect[];
    drawRectSolid(rect: Rect, rgba: RGBA, imgData: ImageData): void;
    drawRectOutline(rect: Rect, rgba: RGBA, imgData: ImageData): void;
    /**
     * Extract maximally stable extremal regions from ImageData object
     * @param {ImageData} imageData - image ImageData object
     */
    extract(imageData: ImageData): Region[];
}
