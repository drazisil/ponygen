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
