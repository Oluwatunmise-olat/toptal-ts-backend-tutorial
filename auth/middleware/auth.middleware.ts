import argon2 from "argon2";
import express from "express";
import usersService from "../../users/users.service";

class AuthMiddleware {
  public async verifyPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByEmailWithPassword(req.body.email);

    if (!user)
      return res
        .status(400)
        .send({ errors: ["Invalid email and/or password"] });

    const passwordHash = user.password;
    const isValid = await argon2.verify(passwordHash, req.body.password);

    if (!isValid) {
      return res.status(401).send({ errors: ["Unauthenticated"] });
    }
    req.body = {
        userId: user._id,
        email: user.email,
        permissionFlags: user.permissionFlags,
    }
    return next()
  }
}
