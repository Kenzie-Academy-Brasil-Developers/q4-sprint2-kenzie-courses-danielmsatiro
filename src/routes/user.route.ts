import { Router } from "express";
import { userController } from "../controllers";
import {
  getUserByIdOr404,
  validateSchema,
  validateToken,
  verifiUserExists,
  verifiUserExistsUpdate,
  verifyAdmin,
  verifyPermission,
} from "../middlewares";
import {
  loginUserSchema,
  createUserSchema,
  userUpdateSchema,
} from "../schemas";
import { subscribeCourseSchema } from "../schemas/user/subscribeCourse.schema";

const userRouter = Router();

userRouter.get(
  "/users",
  validateToken,
  verifyPermission,
  userController.getAll
);
userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  verifiUserExists,
  userController.createUser
);
userRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  userController.loginUser
);
userRouter.get(
  "/users/:id",
  validateToken,
  getUserByIdOr404,
  verifyAdmin,
  userController.getById
);
userRouter.patch(
  "/users/:id",
  validateSchema(userUpdateSchema),
  verifiUserExistsUpdate,
  validateToken,
  getUserByIdOr404,
  verifyAdmin,
  userController.update
);

userRouter.patch(
  "/users/subscribe/:id",
  validateSchema(subscribeCourseSchema),
  validateToken,
  getUserByIdOr404,
  verifyAdmin,
  userController.userSubscribeCourse
);

export default userRouter;
