import express from "express";
import { CommonRouteConfig } from "../common/common.routes";

export class UserRouteConfig extends CommonRouteConfig {
  constructor(public app: express.Application) {
    super(app, "UsersRoutes");
  }

  public configureRoutes(): express.Application {
      return this.app
  }
}
