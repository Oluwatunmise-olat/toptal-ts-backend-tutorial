import express from "express";

export abstract class CommonRouteConfig {
  constructor(public app: express.Application, public name: string) {
    this.configureRoutes();
  }

  public getName() {
    return this.name;
  }

  public abstract configureRoutes(): express.Application;
}
