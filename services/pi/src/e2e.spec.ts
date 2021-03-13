import request from "supertest";
import PIService from "./index";

it("PIService - can start and stop", async (done) => {
  const piService = new PIService();
  expect(piService.server()).toBeNull;
  expect(await piService.listen(2001)).resolves;
  expect(piService.isRunning()).toBeTruthy;

  await piService
    .close()
    .then(() => {
      expect(piService.isRunning()).toBeFalsy;
      done();
    })
    .catch((err) => {
      expect(err).toBeFalsy;
    });
});

it("PIService - can start", async (done) => {
  const server = new PIService();
  server
    .listen(1818)
    .then(() => {
      server.close();
      done();
    })
    .catch((err) => {
      expect(err).toBeFalsy;
    });
});

it("PIService - can throw on bad close", async (done) => {
  const server = new PIService();
  await expect(server.close()).rejects.toThrowError(/not running/);
  done();
});

it("API - home", async (done) => {
  request(new PIService()._express)
    .get("/")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("API Home");
      done();
    });
});

it("API - /pony fails when provided an invalid id", async (done) => {
  request(new PIService()._express)
    .get("/pony/fred")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.message).toContain("NaN is not a number");
      done();
    });
});

it("API - pony", async (done) => {
  request(new PIService()._express)
    .get("/pony/44428505")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.name).toContain("Daddy! <3");
      done();
    });
});

it("API - breed", async (done) => {
  request(new PIService()._express)
    .get("/breed/4")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.name).toEqual('EarthPony');
      done();
    });
});

it("API - getMap should throw when passed an incorrect mapType ", async (done) => {
  request(new PIService()._express)
    .get("/sex/4")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.message).toMatch(/not a valid mapType/);
      done();
    });
});