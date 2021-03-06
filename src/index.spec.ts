import request from "supertest";
import server from "./";

it("Index", async done => {
  request(server)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("About")
      done()
    });

});

it("API", async done => {
  request(server)
    .get("/api")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("API")
      done()
    });
  })

describe('Raw API', () => {
  it("home", async done => {
    request(server)
      .get("/api/raw")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.text).toContain("Raw")
      });
  done()})

  it("pony", async done => {
    request(server)
      .get("/api/raw/pony/1")
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.ID).toEqual(1)
      });
  done()})  
})

