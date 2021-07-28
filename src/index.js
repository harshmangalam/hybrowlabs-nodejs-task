require("dotenv").config()

const { createServer } = require("http");
const {HOST,PORT} = require("./config")
const app = require("./server")

// create new instance of http Server
const server = createServer(app);

function bootstrap() {
  // start http server 
  server.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
  });
}

bootstrap();
