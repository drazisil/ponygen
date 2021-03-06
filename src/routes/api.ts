import { Request, Response } from "express";
import got from "got";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

export function apiHome(req: Request, res: Response): void {
  res.send("API birds");
}

export function apiRawHome(req: Request, res: Response): void {
  res.send("Raw API Home");
}

export async function apiRawPony(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const { body } = await got.get(`http://get.ponyisland.net?pony=${id}`, {
    headers: {
      "user-agent": `ponygen/${pkg.version} (https://github.com/drazisil/ponygen)`,
    },
  });
  const data = JSON.parse(body);
  res.json(data);
}
