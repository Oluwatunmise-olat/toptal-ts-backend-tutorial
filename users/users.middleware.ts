import express from "express";
import usersService from "./users.service";

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields email and password`
      });
    }
  }

  async validateUniqueEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateIsAuthorized(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByEmail(req.body.email);
    if (!user || !(user.id == req.params.id)) {
      return res.status(400).send({ error: "Resource Not Found" });
    }
    return next();
  }

  async setUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.userId = req.params.userId;
    return next();
  }
}

export default new UsersMiddleware();
