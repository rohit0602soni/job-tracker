import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return redirect("/login");
  }

  const jobs = await prisma.job.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Job Applications</h1>
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <p>No jobs added yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">{job.position}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">
                Applied on: {new Date(job.appliedDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">Status: {job.status}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
