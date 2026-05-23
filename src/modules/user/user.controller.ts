import type { Request, Response } from "express";
import { pool } from "../../db";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const result = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await UserService.getUserById(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age ,role} = req.body;

  try {
    if (!name || !email || !password || !age) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const result = await UserService.createUser({ name, email, password, age,role });

    res.status(201).json({
      message: "Data received successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;

  try {
    const result = await UserService.updateUser(id as string, req.body);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await UserService.deleteUser(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

export const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
