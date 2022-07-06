"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rect {
    constructor(left, top, width, height) {
        this.top = Infinity;
        this.bottom = 0;
        this.left = Infinity;
        this.right = 0;
        if (left && top && width && height) {
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }
    }
    get x() {
        return this.left;
    }
    get y() {
        return this.top;
    }
    set width(val) {
        this.right = this.left + val;
    }
    get width() {
        return this.right - this.left;
    }
    set height(val) {
        this.bottom = this.top + val;
    }
    get height() {
        return this.bottom - this.top;
    }
    get ratio() {
        return this.bottom - this.top;
    }
    get size() {
        return this.width * this.height;
    }
    add(x, y) {
        this.top = Math.min(this.top, y);
        this.bottom = Math.max(this.bottom, y + 1);
        this.left = Math.min(this.left, x);
        this.right = Math.max(this.right, x + 1);
    }
    intersect(rect) {
        const intersection = new Rect();
        let isIntersecting = !(rect.left > this.right ||
            rect.right < this.left ||
            rect.top > this.bottom ||
            rect.bottom < this.top);
        if (isIntersecting) {
            intersection.left = Math.max(this.left, rect.left);
            intersection.top = Math.max(this.top, rect.top);
            intersection.right = Math.min(this.right, rect.right);
            intersection.bottom = Math.min(this.bottom, rect.bottom);
        }
        return intersection;
    }
    merge(rect, strict = false) {
        if (strict) {
            var intersection = this.intersect(rect);
            if (!intersection || intersection.size < this.size / 4)
                return;
        }
        this.top = Math.min(this.top, rect.top);
        this.bottom = Math.max(this.bottom, rect.bottom);
        this.left = Math.min(this.left, rect.left);
        this.right = Math.max(this.right, rect.right);
    }
}
exports.default = Rect;
