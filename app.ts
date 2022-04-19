import express from "express";
import http from "http";

import cors from "cors";
import * as expressWinston from "express-winston";
import winston from "winston";

import { UserRouteConfig } from "./users/users.routes";
import debug from "debug";
import { CommonRouteConfig } from "./common/common.routes";

const app: express.Application = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const routes: Array<CommonRouteConfig> = [];

app.use([express.json(), express.urlencoded({ extended: false })]);
app.use(cors());

routes.push(new UserRouteConfig(app));

app.get("/health", (req: express.Request, res: express.Response) => {
  return res.status(200).send(`Server running`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
