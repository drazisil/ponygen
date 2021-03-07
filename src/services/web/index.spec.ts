import request from "supertest";
import WebService from "./index";

it("WebService - can start and stop", async (done) => {
  const webService = new WebService();
  expect(webService.server()).toBeNull
  expect(await webService.listen(2001)).resolves
  expect(webService.isRunning()).toBeTruthy;

  await webService
    .close()
    .then(() => {
      expect(webService.isRunning()).toBeFalsy;
      done();
    })
    .catch((err) => {
      expect(err).toBeFalsy;
    });

});

it("WebService - can start", async (done) => {
  const server = new WebService();
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

it("WebService - can throw on bad close", async (done) => {
  const server = new WebService();
  await expect(server.close()).rejects.toThrowError(/not running/);
  done();
});

it("Index", (done) => {
  request(new WebService()._express)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("About");
      done();
    });
});

it("API", async (done) => {
  request(new WebService()._express)
    .get("/api")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("API");
      done();
    });
});

it("Raw API - home", async (done) => {
  request(new WebService()._express)
    .get("/api/raw")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("Raw");
      done();
    });
});

it("Raw API - pony", async (done) => {
  request(new WebService()._express)
    .get("/api/raw/pony/1")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.ID).toEqual(1);
      done();
    });
});
