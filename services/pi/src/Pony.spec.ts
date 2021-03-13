import { Pony, RGBValue } from "./Pony";

it("RGBValue - throws when value passes is wrong length", async (done) => {
  expect(() => new RGBValue("ABCDEFGHI")).toThrowError(/length is not correct/);
  done();
});

it("RGBValue - _splitIntoRGB throws when value passed does not divide into 2,2,2", async (done) => {
  expect(() => RGBValue._splitIntoRGB("ABCDEFGHI")).toThrowError(
    /not the correct number/
  );
  done();
});

it("RGBValue - _splitIntoRGB throws when value passed does not divide into 2,2,2", async (done) => {
  expect(RGBValue._splitIntoRGB("ABCDEF").b).toBeTruthy
  done();
});

it("Pony - fetchById throws when invalid id is passed", async (done) => {
  const pony = new Pony()
  expect(async () => pony.fetchById(99999999)).rejects.toThrowError(
    /NaN is not a number/
  );
  done();
});