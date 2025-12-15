import React, { useEffect, useState } from "react";
import task_alley from "/task_alley_logo.svg";

import { useLoginAdminMutation } from "../redux/api/userApi";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { setToken } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Load saved credentials on mount
  useEffect(() => {
    const saved = localStorage.getItem("rememberedAdmin");
    if (saved) {
      const { username, password } = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        username,
        password,
        rememberMe: true,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      const payload = await loginAdmin({
        email: formData.username,
        password: formData.password,
      }).unwrap();

      // Save to localStorage only if "Remember me" is checked
      if (formData.rememberMe) {
        localStorage.setItem(
          "rememberedAdmin",
          JSON.stringify({
            username: formData.username,
            password: formData.password,
          })
        );
      } else {
        localStorage.removeItem("rememberedAdmin");
      }

      dispatch(setToken(payload?.data?.accessToken));
      toast.success(payload?.message || "Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Link to="/">
            <img
              src={task_alley}
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </Link>

          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold mb-8">
              Login to Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Username
                </label>
                <div className="relative">
                  <input
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter username"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-5 h-5 absolute right-3 top-3.5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6" />
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-5 h-5 absolute right-3 top-3.5"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                  </svg>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center ">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className=" "
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-900"
                  >
                    Remember me
                  </label>
                </div>
                {/* <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link> */}
              </div>

              {/* Submit Button */}
              <div className="!mt-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 text-base font-medium tracking-wide rounded-md text-white bg-[#115E59] hover:bg-[#09534e] focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
