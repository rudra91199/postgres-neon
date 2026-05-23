import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result;
};

const getUserById = async (id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result;
};

const createUser = async (payload: IUser) => {
  const { name, email, password, age, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,age,role) VALUES($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *
        `,
    [name, email, hashPassword, age, role],
  );

  delete result.rows[0].password;

  return result;
};

const updateUser = async (id: string, payload: IUser) => {
  const { name, password, age } = payload;

  const result = await pool.query(
    `
              UPDATE users
               SET 
               name=COALESCE($1, name), 
               password=COALESCE($2, password), 
               age=COALESCE($3, age), 
               updated_at=NOW() 
               WHERE id=$4 RETURNING *
  `,
    [name, password, age, id],
  );

  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result;
};

export const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
