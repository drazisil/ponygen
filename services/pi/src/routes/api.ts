import { Request, Response } from 'express';
import got from 'got';
import { PIMapJSON, PIPonyJSON } from '../../typings/types';
import { MapTypes } from '../CacheMap';
import { Pony } from '../Pony';

export function apiList(req: Request, res: Response): void {
  const { type } = req.params;
  const cacheMap = req.cacheMap

  res.json({
    type,
    list: cacheMap.listMaps(type)
  })
}

export function apiHome(req: Request, res: Response): void {
  res.send('API Home');
}

export async function apiPony(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

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

export async function apiMap(req: Request, res: Response): Promise<void> {
  const { type } = req.params;

  try {
    const id = Number.parseInt(req.params.id, 10);

    const data = await req.cacheMap.getMap(type, id);
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
      'user-agent': 'ponygen (https://github.com/drazisil/ponygen)',
    },
  });
  return JSON.parse(body);
}

export async function getPony(id: number): Promise<PIPonyJSON> {
  const { body } = await got.get(`http://get.ponyisland.net?pony=${id}`, {
    headers: {
      'user-agent': 'ponygen (https://github.com/drazisil/ponygen)',
    },
  });
  return JSON.parse(body);
}
