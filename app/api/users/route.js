// import { userModel } from "@/models/user-model";
// import connectMongo from "@/services/mongo";
import prisma from "@/prisma/db";

// export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   const searchTerm = searchParams.get("q"); // Can be either name or code
//   await connectMongo(); // Await the connection

//   let userData;

//   if (searchTerm) {
//     // Filter based on searchTerm for either `name` or `memberCode`
//     userData = await userModel.find({
//       $or: [
//         { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by name
//         { memberCode: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by code
//       ],
//     });
//   } else {
//     // No search term, return all data
//     userData = await userModel.find();
//   }

//   return new Response(JSON.stringify({ status: "success", userData }), {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("q");

  let userData;

  if (searchTerm) {
    userData = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            memberCode: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            mobile: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        userPackages: {
          include: {
            package: true,
          },
        },
      },
    });
  } else {
    userData = await prisma.user.findMany({
      include: {
        userPackages: {
          include: {
            package: true,
          },
        },
      },
    });
  }

  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Request body is empty",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const area = await prisma.area.findUnique({
      where: {
        code: data.area,
      },
    });
    const zone = await prisma.zone.findUnique({
      where: {
        code: data.zone,
      },
    });

    const userData = await prisma.user.create({
      data: {
        ...data,
        zone: {
          connect: {
            id: zone.id,
          },
        },
        area: {
          connect: {
            id: area.id,
          },
        },
      },
    });

    return new Response(JSON.stringify({ status: "success", userData }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new user",
        error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
