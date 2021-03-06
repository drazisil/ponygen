import request from "supertest";
import PonyGen from "./";

it("Server - can start and stop", async (done) => {
  const server = new PonyGen();
  expect(server.server()).toBeNull
  expect(await server.listen(2001)).resolves
  expect(server.isRunning()).toBeTruthy;

  await server.close().then(() => {
    expect(server.isRunning()).toBeFalsy;
    done();
  });

});

it("Server - can start", async (done) => {
  const server = new PonyGen();
  server.listen(1818).then(() => {
    server.close();
    done();
  })  
});

it("Server - can throw on bad close", async (done) => {
  const server = new PonyGen();
  await expect(server.close()).rejects.toThrowError(/not running/);
  done();
});

it("Index", (done) => {
  request(new PonyGen()._express)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("About");
      done();
    });
});

it("API", async (done) => {
  request(new PonyGen()._express)
    .get("/api")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("API");
      done();
    });
});

it("Raw API - home", async (done) => {
  request(new PonyGen()._express)
    .get("/api/raw")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("Raw");
      done();
    });
});

it("Raw API - pony", async (done) => {
  request(new PonyGen()._express)
    .get("/api/raw/pony/1")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.body.ID).toEqual(1);
      done();
    });
});
