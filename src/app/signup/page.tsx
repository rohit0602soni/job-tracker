"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("User created! You can now sign in.");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl mb-4">Sign Up</h1>
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
          Sign Up
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </main>
  );
}
