import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config/config";

const loginHandler = async (payload: { email: string; password: string }) => {
  // pool
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email =$1
    `,
    [email],
  );
  //exisiting user check
  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  const matchPassword = await bcrypt.compare(
    password,
    userData.rows[0].password,
  );

  //match password check
  if (!matchPassword) {
    throw new Error("Invalid password");
  }

  //generate jwt token
  const jwtPayload = {
    id: userData.rows[0].id,
    name: userData.rows[0].name,
    email: userData.rows[0].email,
    role: userData.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.refreshSecret, {
    expiresIn: "20d",
  });
  return { accessToken, refreshToken };
};

const generateFreshToken = async (token: string) => {

  if (!token) {
    throw new Error("Unauthorized");
  }

  let validatedUser: JwtPayload | null = null;

  try {
    validatedUser = jwt.verify(token, config.refreshSecret) as JwtPayload;
  } catch (error: any) {
    throw new Error(error.message);
  }

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [validatedUser.email],
  );

  if (userData.rowCount === 0) {
    throw new Error("User not found");
  }

  if (!userData.rows[0].is_active) {
    throw new Error("User is not active");
  }

    //generate jwt token
  const jwtPayload = {
    id: userData.rows[0].id,
    name: userData.rows[0].name,
    email: userData.rows[0].email,
    role: userData.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const AuthService = {
  loginHandler,
  generateFreshToken,
};
