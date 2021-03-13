import { getMap } from "./routes/api";
import { CacheMapEntry, ICacheMap } from "./types";

export const MapTypes: string[] = ["breed", "gene"];

export class CacheMap {
  _cacheMap: ICacheMap = {};

  async getMapName(type: string, id: number): Promise<string> {
    if (!this._cacheMap[type]) {
      this._cacheMap[type] = [];
    }

    if (Number.isNaN(id) || id > Number.MAX_SAFE_INTEGER) {
      throw new Error(`${id} is not a number`);
    }

    const mapEntry = this._cacheMap[type].find((entry: CacheMapEntry) => {
      return entry.id === id;
    });

    if (mapEntry === undefined) {
      // try to fetch from PI and populate cache
      const rawMap = await getMap(type, id);
      if (rawMap.Name === null) {
        throw new Error(
          `Unable to locate an entry for ${type}.${id} on PonyIsland`
        );
      }
      this._cacheMap[type].push({ id: rawMap.ID, name: rawMap.Name });
      return rawMap.Name;
    }
    return mapEntry.name;
  }

  async getMap(type: string, id: number): Promise<CacheMapEntry> {
    if (!this._cacheMap[type]) {
      this._cacheMap[type] = [];
    }

    if (Number.isNaN(id) || id > Number.MAX_SAFE_INTEGER) {
      throw new Error(`${id} is not a number`);
    }

    const mapEntry = this._cacheMap[type].find((entry: CacheMapEntry) => {
      return entry.id === id;
    });

    if (mapEntry === undefined) {
      // try to fetch from PI and populate cache
      const rawMap = await getMap(type, id);
      if (rawMap.Name === null) {
        throw new Error(
          `Unable to locate an entry for ${type}.${id} on PonyIsland`
        );
      }
      this._cacheMap[type].push({ id: rawMap.ID, name: rawMap.Name });
      return {
        id: rawMap.ID,
        name: rawMap.Name
      };
    }
    return mapEntry;
  }
}


