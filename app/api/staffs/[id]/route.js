
import prisma from "@/prisma/db";

// Helper function to handle errors
const handleError = (error, status = 500) => {
  console.error("Error:", error);
  return Response.json(
    { status: "error", message: error.message },
    { status }
  );
};

// GET: Fetch a user by ID
export async function GET(request, { params }) {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: params.id },
    });
    if (!user) {
      return handleError(new Error("User not found"), 404);
    }
    return Response.json({ status: "success", userData: user });
  } catch (error) {
    return handleError(error);
  }
}

// PATCH: Update user status
export async function PATCH(request, { params }) {
  try {
    const { status } = await request.json();

    // Validate status
    if (!["active", "inactive"].includes(status)) {
      return handleError(new Error("Invalid status value"), 400);
    }

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { status },
    });
    if (!updatedUser) {
      return handleError(new Error("User not found"), 404);
    }

    return Response.json({ status: "success", data: updatedUser });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Remove a user
export async function DELETE(request, { params }) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: params.id },
    });
    if (!deletedUser) {
      return handleError(new Error("User not found"), 404);
    }
    return Response.json({ status: "success", data: deletedUser });
  } catch (error) {
    return handleError(error);
  }
}