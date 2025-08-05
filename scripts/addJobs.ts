import {prisma} from "@/lib/prisma";

async function main() {
  const user = await prisma.user.findFirst(); // Get any existing user

  if (!user) {
    console.error("No user found in the database.");
    return;
  }

  await prisma.job.createMany({
    data: [
      {
        company: "Google",
        position: "Frontend Developer",
        status: "applied",
        userId: user.id,
      },
      {
        company: "Amazon",
        position: "Backend Developer",
        status: "interview",
        userId: user.id,
      },
    ],
  });

  console.log("Jobs added successfully.");
}

main().catch((e) => {
  console.error(e);
});
