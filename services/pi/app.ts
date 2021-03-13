import PIService from "./src/index";

let port:number

if (process.env.PORT) {
  port = Number.parseInt(process.env.PORT, 10);
} else {
  port = 3000
}

const server = new PIService();

server.listen(port).then(() => {
  console.log(`PIService Server started on http://localhost:${port}`);
}).catch((err) => {
  console.error(`Error starting server: ${err}`)
})
