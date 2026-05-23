import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";

const loginHandle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginHandler(req.body);

    const { accessToken, refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, //in production set it to true
      httpOnly: true,
      sameSite: "lax",
    });
 
    // res.status(200).json({
    //   message: "Login successful",
    //   data: result,
    // });

    sendResponse(res, {
        statusCode:200,
        success:true,
        message: "Login successful",
        data: result
    }) 

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const refreshTokenHandle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.generateFreshToken(req.cookies.refreshToken);


    res.status(200).json({
      message: "Access token generated successfully",
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const AuthController = {
  loginHandle,
  refreshTokenHandle,
};
