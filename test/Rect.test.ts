import Rect from "../src/Rect";

describe("Rect", () => {
  describe("constructor", () => {
    it("should create the correct default rect", () => {
      const r = new Rect();

      expect(r.left).toStrictEqual(Infinity);
      expect(r.top).toStrictEqual(Infinity);
      expect(r.right).toStrictEqual(0);
      expect(r.bottom).toStrictEqual(0);
    });

    it("should create a basic rect with width and height", () => {
      const r = new Rect(0, 0, 10, 15);

      expect(r.right).toStrictEqual(10);
      expect(r.bottom).toStrictEqual(15);
    });
  });

  describe("intersection", () => {
    it("should find the correct intersection", () => {
      const r1 = new Rect(0, 0, 2, 2);
      const r2 = new Rect(1, 1, 2, 2);

      const intersection = r1.intersect(r2)!;

      expect({
        left: intersection.left,
        right: intersection.right,
        top: intersection.top,
        bottom: intersection.bottom,
      }).toStrictEqual({
        left: 1,
        top: 1,
        right: 2,
        bottom: 2,
      });
    });

    it("should return undefined for no intersection", () => {
      const r1 = new Rect(0, 0, 2, 2);
      const r2 = new Rect(3, 3, 2, 2);

      const intersection = r1.intersect(r2)!;

      expect(intersection).toBeUndefined();
    });
  });
});
