import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  const {  user_id,bio,address,phone,gender } = req.body;

  try {
    const result =await ProfileService.createProfile({ bio, user_id, address, phone, gender })
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0],
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }

}

export const ProfileController = {
    createProfile
}