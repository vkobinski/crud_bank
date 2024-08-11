import { createServer } from "http";
import app from "./app";
import { config } from "./config";
import db_connect from "./db/db";

(async () => {
  const server = createServer(app.callback());

  await db_connect();


  server.listen(config.PORT, () => {
    console.log(`server running at http://localhost:${config.PORT}`);
  });
})();
