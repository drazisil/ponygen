import express from "express";
import { Server } from "node:http";
import routeHome from "./routes";

export default class WebService {
  _isRunning = false;
  _express = express();
  _server: null | Server = null;

  constructor() {
    this._express.use("/", routeHome);

    this._express.use(express.static("public"));
  }

  async listen(port: number): Promise<void> {
    this._server = await this._express.listen(port)
    this._isRunning = true;
  }

  async close(): Promise<void> {
    if (this._server === null) {
      throw new Error("Attempted to close server when it was not running");
    }
    await this._server.close()
    this._isRunning = false;
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  server(): null | Server {
    return this._server;
  }
}
