"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        router.push("/dashboard");
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Login failed: " + error.message);
      } else {
        toast.success("Logged in!");
        router.push("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/auth/callback"
      }});

      if (error) {
        toast.error("Signup failed: " + error.message);
      } else {
        toast.loading("Check your email for confirmation!");
      }
    }
  };

  if (loading) {
    return <div className="flex flex-grow justify-center items-center">Loading...</div>;
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
        <h2 className="text-xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-2 text-sm cursor-pointer underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
        </p>
      </form>
    </div>
  );
}