const express = require("express")

let port

if (process.env.PORT) {
  port = Number.parseInt(process.env.PORT, 10);
} else {
  port = 3000
}

const app = new express()

app.use(express.static("dist"));

try {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })

} catch (error) {
  console.error(`Error starting server: ${error}`)
}
