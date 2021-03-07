import { getPony } from './routes/api'

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export class RGBValue {
    _r: number | undefined
    _g: number | undefined
    _b: number | undefined
    
    constructor(rgb: string) {
        if (rgb.length !== 6) {
            throw new RangeError(`length is not correct. must be exactly 5 characters long`)
        }
        const color = this._splitIntoRGB(rgb)
        this._r = color.r
        this._g = color.g;
        this._b = color.b;

    }

    _splitIntoRGB(fullHex: string): RGB {
        const parts = fullHex.match(/.{2}/g)
        if (parts?.length !== 3) {
            throw new RangeError(`not the correct number of parts`);            
        }
        return {
            r: Number.parseInt(parts[0], 16),
            g: Number.parseInt(parts[1], 16),
            b: Number.parseInt(parts[2], 16)
        }
    }

}

export interface ColorObject {
  eyes: RGBValue;
  hair: RGBValue;
  hair2: RGBValue;
  body: RGBValue;
  extra1: RGBValue;
  extra2: RGBValue;
}

export interface PonyJSON {
  id: number | undefined;
  name: string | undefined;
  breed: string | undefined;
  gender: string | undefined;
  colors: ColorObject | undefined;
  genes: string[] | undefined;
}

export class Pony {
    _id: number | undefined
    _name: string | undefined
    _breed: string | undefined
    _gender: string | undefined
    _colors: ColorObject | undefined
    _genes: string[] | undefined

    static async fetchById(id: number): Promise<Pony> {
        const rawPony = await getPony(id)

        const pony = new Pony()
        pony._id = rawPony.ID;
        pony._name = rawPony.Name
        pony._breed = rawPony.BreedID
        pony._gender = rawPony.Gender
        pony._colors = {
          eyes: new RGBValue(rawPony.Colors.Eyes),
          hair: new RGBValue(rawPony.Colors.Hair),
          hair2: new RGBValue(rawPony.Colors.Hair2),
          body: new RGBValue(rawPony.Colors.Body),
          extra1: new RGBValue(rawPony.Colors.Extra1),
          extra2: new RGBValue(rawPony.Colors.Extra2)
        };
        pony._genes = rawPony.Genes

        return pony
    }

    asJSON(): PonyJSON {
        return {
            id: this._id,
            name: this._name,
            breed: this._breed,
            gender: this._gender,
            colors: this._colors,
            genes: this._genes
        }
    }
}