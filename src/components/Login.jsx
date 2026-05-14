import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-zinc-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-500 border border-zinc-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-500 border border-zinc-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-zinc-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/home" className="text-yellow-400 hover:underline">Continue as guest</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;