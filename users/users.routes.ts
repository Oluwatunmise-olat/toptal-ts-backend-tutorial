import express from "express";
import { CommonRouteConfig } from "../common/common.routes";
import usersController from "./users.controller";
import usersMiddleware from "./users.middleware";

export class UserRouteConfig extends CommonRouteConfig {
  constructor(public app: express.Application) {
    super(app, "UsersRoutes");
  }

  public configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get(usersController.listUsers)
      .post(
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateUniqueEmail,
        usersController.createUser
      );

    this.app.param("userId", usersMiddleware.setUserId);

    this.app
      .route("/users/:userId")
      .get(usersController.getUserById)
      .put(
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateIsAuthorized,
        usersController.fullUpdate
      )
      .patch(usersController.partialUpdate)
      .delete(usersController.removeUser);
    return this.app;
  }
}
