"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContextType from "@/module/context/LoginContextType";
import { LoginContext } from "@/module/context/LoginProvider";
import UserService from "@/module/user/service/UserService";
import LoginResponse from "@/module/user/dto/LoginResponse";

const LoginPage: React.FC = () => {
  const { setUserCookie } = useContext(LoginContext) as LoginContextType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginRequest = {
      email: email,
      password: password,
    };

    try {
      const userService = new UserService();
      const loginResponse = await userService.login(loginRequest);
      setUserCookie(loginResponse as LoginResponse);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      toast.error("Login failed. Please check your email and password.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 0.3 } },
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
        
        <motion.div
          className="w-full md:w-1/2 p-10 space-y-6 bg-white flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-6">
            <p className="text-3xl font-bold text-red-500 mb-2">Tecnos</p>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-600">Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <label className="ml-2 text-sm text-gray-600">Remember for 30 days</label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-red-500 hover:text-red-400">Forgot password?</a>
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:outline-none shadow-md"
              variants={buttonVariants}
              whileHover="hover"
            >
              {loading ? "Logging in..." : "Sign in"}
            </motion.button>

            
          </form>

          <p className="text-center text-gray-500">
            Don’t have an account? <a href="#" className="text-red-500 hover:text-red-400">Sign up</a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex md:w-1/2 bg-gray-200 items-center justify-center relative"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1593642633279-1796119d5482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHJlZHxlbnwwfHx8fDE2ODMzMTE3Njg&ixlib=rb-1.2.1&q=80&w=1080')`,
            }}
          ></div>
          <div className="relative z-10 p-10 text-white text-center">
            <h2 className="text-4xl font-bold">Welcome to Tecnos</h2>
            <p className="mt-2 text-lg">Empowering your journey with innovation and technology.</p>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default LoginPage;
