import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";

export async function GET(request, { params }) {
  const connect = await connectMongo();
  const userData = await userModel.findById(params.id);
  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request, { params }) {
  // Ensure MongoDB connection
  await connectMongo();
  const data = await request.json();
  try {
    // Find the current user by ID
    const user = await userModel.findById(params.id);
    if (!user) {
      throw new Error("User not found");
    }
    // check if the user already has the package
    const existingPackage = user.packages.find(
      (p) => p.packageType === data.packageType
    );
    if (existingPackage) {
      throw new Error("User already has this package");
    }

    // Append the new package data to the existing packages
    const updatedPackages = [...user.packages, data];
    // Update the user document with the new packages array
    const update = await userModel.findByIdAndUpdate(
      params.id,
      { packages: updatedPackages },
      { new: true } // Option to return the updated document
    );
    return new Response(
      JSON.stringify({ status: "success", data: update.packages }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating user packages:", error);
    throw error; // Optionally, re-throw the error for error handling in the caller function
  }
}

export async function DELETE(request, { params }) {
  const connect = await connectMongo();
  const data = await request.json();

  try {
    const userData = await userModel.findById(params.id);
    const updatedPackages = userData.packages.filter(
      (item) => item.packageType !== data.packageType
    );
    const deletedPackage = await userModel.findByIdAndUpdate(
      params.id,
      { packages: updatedPackages },
      { new: true }
    );

    return new Response(JSON.stringify({ status: "success", deletedPackage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to delete user",
      }),
      {
        status: 500,
      }
    );
  }
}
