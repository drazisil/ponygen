import { CacheMap } from "./CacheMap";
import { getPony } from "./routes/api";
import { ColorObject, PonyJSON, RGB } from "./types";

export class RGBValue {
  _r: number | undefined;
  _g: number | undefined;
  _b: number | undefined;

  constructor(rgb: string) {
    if (rgb.length !== 6) {
      throw new RangeError(
        `length is not correct. must be exactly 6 characters long`
      );
    }
    const color = RGBValue._splitIntoRGB(rgb);
    this._r = color.r;
    this._g = color.g;
    this._b = color.b;
  }

  static _splitIntoRGB(fullHex: string): RGB {
    const parts = fullHex.match(/.{2}/g);
    if (parts === null || parts.length !== 3) {
      throw new RangeError(`not the correct number of parts`);
    }
    return {
      r: Number.parseInt(parts[0], 16),
      g: Number.parseInt(parts[1], 16),
      b: Number.parseInt(parts[2], 16),
    };
  }
}

export class Pony {
  _id: number | undefined;
  _name: string | undefined;
  _breed: string | undefined;
  _gender: string | undefined;
  _colors: ColorObject | undefined;
  _genes: string[] | undefined;
  _cache = new CacheMap();

  async fetchById(id: number): Promise<void> {
    const rawPony = await getPony(id);

    this._id = rawPony.ID;
    this._name = rawPony.Name;
    const breedName = await this._cache.getMapName('breed', Number.parseInt(rawPony.BreedID))
    this._breed = breedName    
    this._gender = rawPony.Gender;
    this._colors = {
      eyes: new RGBValue(rawPony.Colors.Eyes),
      hair: new RGBValue(rawPony.Colors.Hair),
      hair2: new RGBValue(rawPony.Colors.Hair2),
      body: new RGBValue(rawPony.Colors.Body),
      extra1: new RGBValue(rawPony.Colors.Extra1),
      extra2: new RGBValue(rawPony.Colors.Extra2),
    };
    this._genes = rawPony.Genes;
  }

  asJSON(): PonyJSON {
    return {
      id: this._id,
      name: this._name,
      breed: this._breed,
      gender: this._gender,
      colors: this._colors,
      genes: this._genes,
    };
  }
}
