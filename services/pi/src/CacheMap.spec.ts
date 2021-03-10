import { CacheMap } from "./CacheMap";

it("CacheMap - getMapName should return name when id is found in cache", async (done) => {
  const cacheMap = new CacheMap();
  cacheMap._cacheMap["breed"] = [];
  cacheMap._cacheMap["breed"].push({ id: 4, name: "Frank" });
  expect(cacheMap._cacheMap["breed"].length).toEqual(1);
  const result = await cacheMap.getMapName("breed", 4);
  expect(result).toEqual("Frank");
  done();
});

it("CacheMap - getMapName should throw when id is NaN", async (done) => {
  const cacheMap = new CacheMap();
  cacheMap._cacheMap["breed"] = [];
  cacheMap._cacheMap["breed"].push({ id: 4, name: "Frank" });
  expect(cacheMap._cacheMap["breed"].length).toEqual(1);
  expect(
    cacheMap.getMapName("breed", 9999999999999999999999)
  ).rejects.toThrowError(/1e\+22/);
  done();
});
