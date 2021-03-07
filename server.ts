import WebService from './src/services/web'

let port:number

if (process.env.PORT) {
  port = Number.parseInt(process.env.PORT, 10);
} else {
  port = 3000
}

const server = new WebService()

server.listen(port).then(() => {
  console.log(`Server started on http://localhost:${port}`)
}).catch((err) => {
  console.error(`Error starting server: ${err}`)
})
