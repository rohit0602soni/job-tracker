"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setMessage("Invalid email or password");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Sign In
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </main>
  );
}
