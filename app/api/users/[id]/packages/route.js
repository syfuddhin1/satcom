import prisma from "@/prisma/db";

// Helper function to handle errors
const handleError = (error, status = 500) => {
  console.error("Error:", error);
  return Response.json({ status: "error", message: error.message }, { status });
};

// GET: Fetch a user packages by ID
export async function GET(request, { params }) {
  try {
    const userPackages = await prisma.userPackage.findUnique({
      where: { userId: params.id },
    });
    if (!userPackages) {
      return handleError(new Error("User packages not found"), 404);
    }
    return Response.json({ status: "success", data: userPackages });
  } catch (error) {
    return handleError(error);
  }
}

// POST: Create a new user package
export async function POST(request, { params }) {
  try {
    const { userId, packageId, billing_date } = await request.json();
    const newPackage = await prisma.userPackage.create({
      data: {
        userId,
        packageId,
        billing_date: new Date(billing_date),
      },
    });
    return Response.json({ status: "success", data: newPackage });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Remove a user package
export async function DELETE(request, { params }) {
  try {
    const deletedPackage = await prisma.userPackage.delete({
      where: { id: params.id },
    });
    return Response.json({ status: "success", data: deletedPackage });
  } catch (error) {
    return handleError(error);
  }
}
