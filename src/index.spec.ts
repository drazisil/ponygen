import request from "supertest";
import tap from "tap";
import server from "./";

tap.test("Index", function (t) {
  request(server)
    .get("/about")
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      t.contains(res.text, "About", '/about contains "About"');
      t.done()
    });

});
