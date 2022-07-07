import MSER from "../src/MSER";
import ImageSync from "image-sync";

describe("MSER", () => {
  describe("extract", () => {
    it("should extract the correct amount of blobs", () => {
      let mser = new MSER({
        delta: 2,
        minArea: 0.001,
        maxArea: 0.5,
        maxVariation: 0.5,
        minDiversity: 0.33,
      });

      let imageData = ImageSync.read("test/res/lorem-ipsum.jpg");

      let rects = mser.extract(imageData).map(
        (region) => region.rect // use only regions rect
      );

      expect(rects).toHaveLength(995);
    });

    it("should merge the correct amount of blobs", () => {
      let mser = new MSER({
        delta: 2,
        minArea: 0.001,
        maxArea: 0.5,
        maxVariation: 0.5,
        minDiversity: 0.33,
      });

      let imageData = ImageSync.read("test/res/lorem-ipsum.jpg");

      let rects = mser.extract(imageData).map(function (region) {
        return region.rect; // use only regions rect
      });

      rects = mser.mergeRects(rects); //merge results

      expect(rects).toHaveLength(99);
    });
  });
});
