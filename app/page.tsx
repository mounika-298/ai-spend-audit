"use client";

import Navbar from "../components/Navbar";
import AuditForm from "../components/AuditForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center px-6 py-32">

        <h1 className="text-5xl md:text-7xl font-bold text-center">
          AI Spend Audit
        </h1>

        <p className="mt-6 text-lg text-gray-400 text-center max-w-2xl">
          Discover how much your startup is overspending on AI tools like
          ChatGPT, Claude, Cursor, and GitHub Copilot.
        </p>

        <button
          onClick={() => alert("Audit Started 🚀")}
          className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Start Free Audit
        </button>

      </section>

        <section className="px-6 pb-32">
          <AuditForm />
        </section>

    </main>
  );
}