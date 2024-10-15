"use client";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi"; // Import show/hide icons
import { Button } from "./Button";
import Link from "next/link";
import { Inputfor } from "./Inputfor";
import Errorcomp from "./Errorcomp";
import { useUser } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";

export const Login = () => {
  const { loginHandler, isLoggedIn } = useUser();
  const router = useRouter();

  // If user is already logged in, redirect to the dashboard
  if (isLoggedIn) {
    router.push("/dashboard");
  }

  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  // const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const logInputValue = async () => {
    const { email, password } = inputValue;
    try {
      await loginHandler(email, password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* {loading && <Loading />} */}
      <div className="flex w-full justify-center items-center gap-2 flex-col">
        <div className="flex flex-col mt-[16px] items-center gap-4"></div>
        <div className="font-bold mt-4 text-gradient-to-r from-orange-400 to-pink-600 text-2xl">
          Log In
        </div>

        {/* Email Input */}
        <div className="flex mt-[40px]">
          <Inputfor
            bg={"bg-gray-100"}
            name={"email"}
            className="w-[350px]"
            onChange={handleChange}
            placeholder={"Email"}
          />
        </div>

        {/* Password Input with Show/Hide Toggle */}
        <div className="mt-[16px] relative">
          <Inputfor
            type={showPassword ? "text" : "password"} // Toggle between "password" and "text"
            bg={"bg-gray-100"}
            name={"password"}
            className="w-[350px]"
            onChange={handleChange}
            placeholder={"Password"}
          />
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={togglePasswordVisibility} // Toggle password visibility
          >
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}{" "}
            {/* Toggle icon */}
          </button>
        </div>

        {/* Error Component */}
        {error && <Errorcomp text={error} />}

        {/* Log In Button */}
        <div className="mt-[16px]">
          <Button
            rounded={"rounded-3xl"}
            onClick={logInputValue}
            bg={"bg-gradient-to-r from-orange-400 to-pink-600"}
            tcolor={"text-white"}
            className={"w-[350px]"}
            text={"Log In"}
          />
        </div>

        {/* Sign Up Link */}
        <div className="flex mt-8 gap-4">
          <div>Don't have an account?</div>
          <Link className="text-blue-500" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
