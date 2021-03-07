import { Request, Response } from "express";
import got from "got";
import { Pony } from "../Pony";

export interface PIPonyJSON {
  ID: number;
  Name: string
  BreedID: string
  Gender: string
  Colors: {
    Eyes: string
    Hair: string
    Hair2: string
    Body: string
    Extra1: string
    Extra2: string
  };
  Genes: string[];
}

export function apiHome(req: Request, res: Response): void {
  res.send("API birds");
}

export function apiRawHome(req: Request, res: Response): void {
  res.send("Raw API Home");
}

export async function apiRawPony(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const pony = await Pony.fetchById(Number.parseInt(id, 10))
  
  const data = pony.asJSON()

  res.json(data);
}

export async function getPony(id: number): Promise<PIPonyJSON> {
  const { body } = await got.get(`http://get.ponyisland.net?pony=${id}`, {
    headers: {
      "user-agent": `ponygen (https://github.com/drazisil/ponygen)`,
    },
  });
  return JSON.parse(body);


}

export async function apiRawBreed(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const { body } = await got.get(`http://get.ponyisland.net?breed=${id}`, {
    headers: {
      "user-agent": `ponygen (https://github.com/drazisil/ponygen)`,
    },
  });
  const data = JSON.parse(body);
  res.json(data);
}