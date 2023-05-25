import { Request, Router } from "express";
import { DB } from "../../service/DB";
import { addUser, deleteUser, userCount, searchUser } from "./user.controller";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createDateTime: number;
}

interface UsersParams {
  skip?: number;
  limit?: number;
}

const router = Router();

router.get("/", (req: Request<unknown, any, any, UsersParams>, res) => {
  // Not allowed to change 🙂
  const { skip = 0, limit = 5 } = req.query;

  return DB.getDB()
    .then((db) =>
      db
        .collection<User>("user")
        .find({})
        .limit(Math.min(50, limit))
        .skip(Math.max(0, skip))
        .project({ email: 0 })
        .toArray()
    )
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.post("/", addUser);

router.get("/search", searchUser);

router.get("/count", userCount);

router.get("/:id", (req, res) => {
  return DB.getDB()
    .then((db) => db.collection<User>("user").findOne({ _id: req.params.id }))
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", deleteUser);

export default router;
