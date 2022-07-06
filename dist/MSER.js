"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rect_1 = require("./Rect");
const Region_1 = require("./Region");
const MAX_LEVEL = 256;
class MSER {
    constructor(options = options) {
        this.options = options;
        this.eight = true;
    }
    mergeRects(rects) {
        // merge overlapping regions
        let intersection = new Rect_1.default();
        for (let i = rects.length - 1; i >= 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                intersection = rects[j].intersect(rects[i]);
                if (intersection &&
                    (intersection.size > 0.5 * rects[j].size ||
                        intersection.size > 0.5 * rects[i].size)) {
                    rects[j].merge(rects[i]);
                    rects.splice(i, 1);
                    break;
                }
            }
        }
        return rects;
    }
    drawRectSolid(rect, rgba, imgData) {
        for (let _x = rect.left; _x < rect.left + rect.width; _x++) {
            for (let _y = rect.top; _y < rect.top + rect.height; _y++) {
                imgData.data[4 * (_x + _y * imgData.width)] = rgba[0];
                imgData.data[4 * (_x + _y * imgData.width) + 1] = rgba[1];
                imgData.data[4 * (_x + _y * imgData.width) + 2] = rgba[2];
                imgData.data[4 * (_x + _y * imgData.width) + 3] = rgba[3];
            }
        }
    }
    drawRectOutline(rect, rgba, imgData) {
        this.drawRectSolid(new Rect_1.default(rect.left, rect.top, rect.width, 1), rgba, imgData);
        this.drawRectSolid(new Rect_1.default(rect.left, rect.top + rect.height - 1, rect.width, 1), rgba, imgData);
        this.drawRectSolid(new Rect_1.default(rect.left, rect.top, 1, rect.height), rgba, imgData);
        this.drawRectSolid(new Rect_1.default(rect.left + rect.width - 1, rect.top, 1, rect.height), rgba, imgData);
    }
    extract(imageData) {
        let mask = [], accessible = [], boundaryPixels = [], priority = MAX_LEVEL, stack = [], regions = [], data = imageData.data, width = imageData.width, height = imageData.height;
        let processStack = function processStack(level, pixel) {
            let top;
            while (level > stack[stack.length - 1].level) {
                top = stack.pop();
                if (level < stack[stack.length - 1].level) {
                    stack.push(new Region_1.default(level, pixel));
                    stack[stack.length - 1].merge(top);
                    return;
                }
                stack[stack.length - 1].merge(top);
            }
        };
        let index = 0, i, n = data.length;
        for (i = 0; i < n; i += 4) {
            mask[index] = data[i];
            index += 1;
        }
        n = width * height;
        for (i = 0; i < n; i += 1)
            accessible[i] = false;
        for (i = 0; i < MAX_LEVEL; i += 1)
            boundaryPixels[i] = [];
        stack.push(new Region_1.default(MAX_LEVEL));
        let curPixel = 0, curEdge = 0, curLevel = mask[0];
        accessible[0] = true;
        stack.push(new Region_1.default(curLevel));
        let x, y, nx, ny, neighborPixel, neighborLevel, newLevel, offsets = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1],
        ];
        for (;;) {
            x = curPixel % width;
            y = Math.floor(curPixel / width);
            for (; curEdge < (this.eight ? 8 : 4); ++curEdge) {
                nx = x + offsets[curEdge][0];
                ny = y + offsets[curEdge][1];
                if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                    neighborPixel = ny * width + nx;
                    if (!accessible[neighborPixel]) {
                        neighborLevel = mask[neighborPixel];
                        accessible[neighborPixel] = true;
                        if (neighborLevel < curLevel) {
                            boundaryPixels[curLevel].push((curPixel << 4) | (curEdge + 1));
                            priority = Math.min(curLevel, priority);
                            curPixel = neighborPixel;
                            curEdge = 0;
                            curLevel = neighborLevel;
                            stack.push(new Region_1.default(curLevel));
                            x = curPixel % width;
                            y = Math.floor(curPixel / width);
                            continue;
                        }
                        boundaryPixels[neighborLevel].push(neighborPixel << 4);
                        priority = Math.min(neighborLevel, priority);
                    }
                }
            }
            stack[stack.length - 1].accumulate(x, y);
            if (priority === MAX_LEVEL) {
                processStack(MAX_LEVEL, curPixel);
                stack[stack.length - 1].process(this.options.delta, this.options.minArea * width * height, this.options.maxArea * width * height, this.options.maxletiation, this.options.minDiversity);
                stack[stack.length - 1].save(regions);
                return regions;
            }
            curPixel =
                boundaryPixels[priority][boundaryPixels[priority].length - 1] >> 4;
            curEdge =
                boundaryPixels[priority][boundaryPixels[priority].length - 1] & 15;
            boundaryPixels[priority].pop();
            while (priority < MAX_LEVEL && boundaryPixels[priority].length === 0)
                ++priority;
            newLevel = mask[curPixel];
            if (newLevel !== curLevel) {
                processStack(newLevel, curPixel);
                curLevel = newLevel;
            }
        }
    }
}
exports.default = MSER;
let _MSER = function _MSER(opts) {
    /**
     * Extract maximally stable extremal regions from ImageData object
     * @param {ImageData} imageData - image ImageData object
     */
    this.extract = function extract(imageData) { };
};
