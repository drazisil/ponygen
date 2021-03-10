import { Request, Response } from "express";
import got from "got";
import { MapTypes } from "../CacheMap";
import { Pony } from "../Pony";
import { PIMapJSON, PIPonyJSON } from "../types";

export function apiHome(req: Request, res: Response): void {
  res.send("API birds");
}

export function apiRawHome(req: Request, res: Response): void {
  res.send("Raw API Home");
}

export async function apiRawPony(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    const pony = new Pony();
    await pony.fetchById(Number.parseInt(id, 10));

    const data = pony.asJSON();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

export async function apiRawMap(req: Request, res: Response): Promise<void> {
  const type = req.params.type;

  try {
    const id = Number.parseInt(req.params.id, 10);

    const data = await getMap(type, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

export async function getMap(type: string, id: number): Promise<PIMapJSON> {

  if (!MapTypes.includes(type)) {
    throw new Error(`${type} is not a valid mapType`);
  }
  const { body } = await got.get(`http://get.ponyisland.net?${type}=${id}`, {
    headers: {
      "user-agent": `ponygen (https://github.com/drazisil/ponygen)`,
    },
  });
  return JSON.parse(body);
}

export async function getPony(id: number): Promise<PIPonyJSON> {
  const { body } = await got.get(`http://get.ponyisland.net?pony=${id}`, {
    headers: {
      "user-agent": `ponygen (https://github.com/drazisil/ponygen)`,
    },
  });
  return JSON.parse(body);
}
