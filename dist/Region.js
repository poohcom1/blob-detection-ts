"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rect_1 = require("./Rect");
class Region {
    constructor(level, moments = [0, 0, 0, 0, 0], area = 0, variation = Infinity, stable = false, rect = new Rect_1.default()) {
        this.level = level;
        this.moments = moments;
        this.area = area;
        this.variation = variation;
        this.stable = stable;
        this.rect = rect;
    }
    accumulate(x, y) {
        this.area += 1;
        this.moments[0] += x;
        this.moments[1] += y;
        this.moments[2] += x * x;
        this.moments[3] += x * y;
        this.moments[4] += y * y;
        this.rect.add(x, y);
    }
    merge(child) {
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
    process(delta, minArea, maxArea, maxVariation, minDiversity) {
        let parent = this;
        while (parent.parent && parent.parent.level <= this.level + delta)
            parent = parent.parent;
        this.variation = (parent.area - this.area) / this.area;
        this.stable =
            this.area >= minArea &&
                this.area <= maxArea &&
                this.variation <= maxVariation;
        for (parent = this.parent; parent && this.area > minDiversity * parent.area; parent = parent.parent) {
            if (parent.variation <= this.variation)
                this.stable = false;
            if (this.variation < parent.variation)
                parent.stable = false;
        }
        for (var child = this.child; child; child = child.next) {
            child.process(delta, minArea, maxArea, maxVariation, minDiversity);
        }
    }
    save(regions) {
        if (this.stable)
            regions.push(this);
        for (var child = this.child; child; child = child.next) {
            child.save(regions);
        }
    }
    getRect() {
        return this.rect;
    }
}
exports.default = Region;
