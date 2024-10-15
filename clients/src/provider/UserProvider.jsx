"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const AncestorProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const loginHandler = async (email, password) => {
    try {
      const result = await axios.post(
        "https://payplay-plhh.onrender.com/api/user/login",
        {
          email,
          password,
        }
      );

      window.localStorage.setItem("token", result.data.token);
      window.localStorage.setItem("username", result.data.username);
      setToken(result.data.token);
      setUsername(result.data.username);
      setIsLoggedIn(true);
    } catch (error) {
      setToken("");
      setUsername("");
      throw new Error(error.response.data.message);
    }
  };

  const logOutHandler = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const storedUsername = window.localStorage.getItem("username");

    if (token) {
      setToken(token);
      setUsername(storedUsername);
      setIsLoggedIn(true);
    } else {
      setToken("");
      setUsername("");
      setIsLoggedIn(false);
      router.push("/login");
    }
  }, [router]);

  return (
    <UserContext.Provider
      value={{ loginHandler, isLoggedIn, logOutHandler, token, username }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
  ``;
};
