import { getMap } from "./routes/api";
import { CacheMapEntry, ICacheMap } from "./types";

export const MapTypes: string[] = ['breed']

export class CacheMap {
  _cacheMap: ICacheMap = {};

  async getMapName(type: string, id: number): Promise<string> {
    if (!this._cacheMap[type]) {
        this._cacheMap[type] = []
    }

    const mapEntry = this._cacheMap[type].find((entry: CacheMapEntry) => {
      return entry.id === id;
    });

    if (mapEntry === undefined) {
        // try to fetch from PI and populate cache
        const rawMap = await await getMap(type, id)
            if (rawMap.ID === null) {
      throw new Error(
        `Unable to locate an entry for ${type}.${id} on PonyIsland`
      );
                
            }
        this._cacheMap[type][id] = {id: rawMap.ID, name: rawMap.Name}
        return this._cacheMap[type][id].name

      throw new Error(
        `Unable to locate an entry for ${type}.${id} in the cache`
      );
    }
    return mapEntry.name;
  }
}
