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

it("Index", (done) => {
  request(new PIService()._express)
    .get("/")
    .expect(404)
    .end((err) => {
      if (err) throw err;
      done();
    });
});

it("About", (done) => {
  request(new PIService()._express)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("About");
      done();
    });
});

it("API", async (done) => {
  request(new PIService()._express)
    .get("/api")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("API");
      done();
    });
});

it("Raw API - home", async (done) => {
  request(new PIService()._express)
    .get("/api/raw")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("Raw");
      done();
    });
});

it("Raw API - pony", async (done) => {
  request(new PIService()._express)
    .get("/api/raw/pony/44428505")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.name).toContain('Daddy! <3')
      done();
    });
});

it("Raw API - breed", async (done) => {
  request(new PIService()._express)
    .get("/breed/4")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.Name).toEqual('EarthPony');
      done();
    });
});

it("Raw API - getMap should throw when passed an incorrect mapType ", async (done) => {
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