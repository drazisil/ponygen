import request from "supertest";
import server from "./";

test("Index", function () {
  request(server)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toContain("About")
    });

});
