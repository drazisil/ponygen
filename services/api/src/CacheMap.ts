import { getMap } from './routes/api';
import { CacheMapEntry, ICacheMap, MapCountEntry } from '../typings/types';

export const MapTypes: string[] = ['breed', 'gene'];

export class CacheMap {
  _cacheMap: ICacheMap = {};
  _maxMaps: MapCountEntry = {}

  constructor() {
    this._cacheMap['breed'] = []
    this._cacheMap['gene'] = []
    this._maxMaps['breed'] = 100
    this._maxMaps['gene'] = 100
  }


  async syncMaps(type: string): Promise<void> {
    for (let index = 1; index < this._maxMaps[type]; index++) {
      try {
        await this.getMapName(type, index)
      } catch (error) {
        break
      }      
    }
  }


  listMaps(type: string) {
    return this._cacheMap[type]
  }

  async getMapName(type: string, id: number): Promise<string> {
    if (Number.isNaN(id) || id > Number.MAX_SAFE_INTEGER) {
      throw new Error(`${id} is not a number`);
    }

    const mapEntry = this._cacheMap[type].find((entry: CacheMapEntry) => entry.id === id);

    if (mapEntry === undefined) {
      // try to fetch from PI and populate cache
      const rawMap = await getMap(type, id);
      if (rawMap.Name === null) {
        throw new Error(
          `Unable to locate an entry for ${type}.${id} on PonyIsland`,
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

    const mapEntry = this._cacheMap[type].find((entry: CacheMapEntry) => entry.id === id);

    if (mapEntry === undefined) {
      // try to fetch from PI and populate cache
      const rawMap = await getMap(type, id);
      if (rawMap.Name === null) {
        throw new Error(
          `Unable to locate an entry for ${type}.${id} on PonyIsland`,
        );
      }
      this._cacheMap[type].push({ id: rawMap.ID, name: rawMap.Name });
      return {
        id: rawMap.ID,
        name: rawMap.Name,
      };
    }
    return mapEntry;
  }
}
