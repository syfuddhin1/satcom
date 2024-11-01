"use server";
import { signIn } from "@/auth";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import bcrypt from "bcryptjs";

export async function addUser(user) {
  const connect = await connectMongo();
  console.log(user);

  try {
    const newUser = await userModel.create({
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 5),
    });
    console.log(newUser);
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (err) {
    // console.log(err);
    if (err.code === 11000) {
      return {
        success: false,
        message: `User already exists with ${
          err.keyValue.email || "your email"
        }. `,
      };
    }
    return {
      success: false,
    };
  }
}
export async function loginUser(user) {
  try {
    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirectTo: "/en",
      redirect: false,
    });
    return res;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

export async function getUserData(id) {
  try {
    const connect = await connectMongo();
    const userData = await userModel.findById(id).lean();
    return replaceMongoIdInObject(userData);
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

export async function updateUserData(id, data) {
  try {
    const connect = await connectMongo();
    const userData = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      success: false,
    };
  }
}
