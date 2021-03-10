import { RGBValue } from "./Pony";

export interface PIPonyJSON {
  ID: number;
  Name: string;
  BreedID: string;
  Gender: string;
  Colors: {
    Eyes: string;
    Hair: string;
    Hair2: string;
    Body: string;
    Extra1: string;
    Extra2: string;
  };
  Genes: string[];
}

export interface PIMapJSON {
  ID: number;
  Name: string;
}

export interface ICacheMap {
    [breed: string]: CacheMapEntry[]
}

export interface CacheMapEntry {
    id: number
    name: string
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

export interface RGB {
  r: number;
  g: number;
  b: number;
}