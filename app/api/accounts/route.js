import prisma from "@/prisma/db";

export async function GET() {
  // Fetch data from MongoDB
  const accountsData = await prisma.account.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify({ status: "success", accountsData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Generate account ID
    const accountCount = await prisma.account.count();
    const accountId = (accountCount + 1)
      .toString()
      .padStart(3, "0");

    const accounts = await prisma.account.create({
      data: {
        ...data,
        accountId,
      },
    });

    return new Response(JSON.stringify({ status: "success", accounts }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const accounts = await prisma.account.update({
      where: {
        id: data.id,
      },
      data,
    });
    return new Response(JSON.stringify({ status: "success", accounts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    const accounts = await prisma.account.delete({
      where: {
        id: data.id,
      },
    });
    return new Response(JSON.stringify({ status: "success", accounts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
