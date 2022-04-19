import express from "express";
import { CommonRouteConfig } from "../common/common.routes";

export class UserRouteConfig extends CommonRouteConfig {
  constructor(public app: express.Application) {
    super(app, "UsersRoutes");
  }

  public configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send("Users List");
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(201).send("Create Users Post");
      });

    this.app
      .route("/users/:userId")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          return next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send("Get requested resource");
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send("Put method for requested resource");
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send("Patch method for requested resource");
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send("Delete method for requested resource");
      });
    return this.app;
  }
}
