import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DB } from "../../service/DB";

// CREATE NEW USER

// User interface
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createDateTime: number;
}

// UserBody interface
interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
}

// Count user entires in db collection

export const userCount = async (req: Request, res: Response) => {
  try {
    console.log("userCount called"); // Add logging
    const db = await DB.getDB();
    const count = await db.collection<User>("user").countDocuments({});
    console.log("Count: ", count); // Add logging
    res.json({ count });
  } catch (err) {
    console.log("Error: ", err); // Add logging
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const addUser = async (
  req: Request<any, any, UserBody>,
  res: Response
) => {
  const { firstName, lastName, email } = req.body;

  const newUser: User = {
    _id: new ObjectId().toHexString(),
    firstName,
    lastName,
    email,
    createDateTime: Date.now(),
  };

  try {
    const db = await DB.getDB();
    await db.collection<User>("user").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

// DELETE USER

export const deleteUser = async (
  req: Request<{ id: string }, any, any>,
  res: Response
) => {
  const userId = req.params.id;

  try {
    const db = await DB.getDB();
    const result = await db.collection<User>("user").deleteOne({ _id: userId });

    if (!result.deletedCount) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};

// SEARCH DATABASE FOR USER

export const searchUser = async (req: Request, res: Response) => {
  const searchTerm = req.query.q as string;
  const query = {
    $or: [
      { _id: searchTerm },
      { firstName: new RegExp(searchTerm, "i") },
      { lastName: new RegExp(searchTerm, "i") },
    ],
  };

  try {
    if (searchTerm === "") {
      res.status(500).json({ message: "Search Term is Empty" });
    }
    const db = await DB.getDB();
    const users = await db.collection<User>("user").find(query).toArray();
    console.log(users);
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
