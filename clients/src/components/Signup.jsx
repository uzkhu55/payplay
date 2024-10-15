"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";
import Link from "next/link";
import { Inputfor } from "./Inputfor";
import { BiSolidShow, BiSolidHide } from "react-icons/bi"; // Import show/hide icons
import axios from "axios";
import { useRouter } from "next/navigation";
import Errorcomp from "./Errorcomp";
import { useUser } from "@/provider/UserProvider";

export const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
    RepeatPassword: "",
    birthday: "", // Add birthday field
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // State for toggling repeat password visibility
  const router = useRouter();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
    event.preventDefault();
  };

  const checkUsernameExists = async (username) => {
    try {
      const response = await axios.get(
        `https://payplay-plhh.onrender.com/api/user?username=${username}`
      );
      return response.data.length > 0; // Assuming the response is an array of matching users
    } catch (error) {
      console.error("Error checking username:", error);
      return false; // Assume username does not exist if there's an error
    }
  };

  const logInputValue = async () => {
    const { email, username, password, RepeatPassword, birthday } = inputValue;

    if (!email || !username || !password || !RepeatPassword || !birthday) {
      setError("All fields must be filled out.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("Email must be a valid Gmail address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== RepeatPassword) {
      setError("Passwords do not match");
      return;
    }

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setError("Username already exists.");
      return;
    }

    try {
      await axios.post("https://payplay-plhh.onrender.com/api/user/signup", {
        email,
        password,
        username,
        birthday,
      });
      router.push("/login");
    } catch (error) {
      setError(error.response?.data || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full justify-center items-center gap-4 flex-col">
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold mt-4 text-2xl">Create your account</div>
        </div>
        <div className="mt-4">
          <Inputfor
            type={"text"}
            bg={"bg-gray-100"}
            className="w-[350px]"
            name={"username"}
            onChange={handleChange}
            placeholder={"Name"}
          />
        </div>
        <div>
          <Inputfor
            bg={"bg-gray-100"}
            className="w-[350px]"
            name={"email"}
            onChange={handleChange}
            placeholder={"Email"}
          />
        </div>
        <div className=" relative">
          <Inputfor
            type={showPassword ? "text" : "password"}
            bg={"bg-gray-100"}
            className="w-[350px]"
            onChange={handleChange}
            name={"password"}
            placeholder={"Password"}
          />
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </button>
        </div>
        <div className=" relative">
          <Inputfor
            type={showRepeatPassword ? "text" : "password"}
            bg={"bg-gray-100"}
            className="w-[350px]"
            onChange={handleChange}
            name={"RepeatPassword"}
            placeholder={"Repeat Password"}
          />
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={toggleRepeatPasswordVisibility}
          >
            {showRepeatPassword ? <BiSolidHide /> : <BiSolidShow />}
          </button>
        </div>
        <div>
          <Inputfor
            type={"date"}
            bg={"bg-gray-100"}
            className="w-[350px]"
            onChange={handleChange}
            name={"birthday"}
            placeholder={"Birthday"}
          />
        </div>
        {error && <Errorcomp text={error} />} {/* Display error message here */}
        <div>
          <Button
            onClick={logInputValue}
            rounded={"rounded-3xl"}
            bg={"bg-gradient-to-r from-orange-400 to-pink-600"}
            hover={"hover:bg-blue-700"}
            tcolor={"text-white"}
            className={"w-[350px]"}
            text={"Sign up"}
          />
        </div>
        <div className="flex mt-2 gap-4">
          <div>Already registered?</div>
          <Link className="text-blue-500" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
