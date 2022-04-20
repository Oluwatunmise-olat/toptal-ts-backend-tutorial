import express from "express";
import { CommonRouteConfig } from "../common/common.routes";
import usersController from "./users.controller";
import usersMiddleware from "./users.middleware";
import BodyValidationMiddleware from "../common/middleware/validation.middleware";
import { body } from "express-validator";

export class UserRouteConfig extends CommonRouteConfig {
  constructor(public app: express.Application) {
    super(app, "UsersRoutes");
  }

  public configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get(usersController.listUsers)
      .post(
        body("email").isEmail(),
        body("password")
          .trim()
          .isLength({ min: 5 })
          .withMessage("Field 'email' is required with (5+ characters)"),
        BodyValidationMiddleware.getBodyFieldErrors,
        usersMiddleware.validateUniqueEmail,
        usersController.createUser
      );

    this.app.param("userId", usersMiddleware.setUserId);

    this.app
      .route("/users/:userId")
      .get(usersController.getUserById)
      .put(
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Field 'email' is required with (5+ characters)"),
        body("firstName").isString(),
        body("lastName").isString(),
        body("permissionFlags").isInt(),
        BodyValidationMiddleware.getBodyFieldErrors,
        usersMiddleware.validateIsAuthorized,
        usersController.fullUpdate
      )
      .patch(
        body("email").isEmail().optional(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Field 'email' is required with (5+ characters)")
          .optional(),
        body("firstName").isString().optional(),
        body("lastName").isString().optional(),
        body("permissionFlags").isInt().optional(),
        BodyValidationMiddleware.getBodyFieldErrors,
        usersController.partialUpdate
      )
      .delete(usersController.removeUser);
    return this.app;
  }
}
