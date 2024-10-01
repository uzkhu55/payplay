"use client";
import { Button } from "./Button";
import { BiLogoNetlify } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";

import { Inputfor } from "./Inputfor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Step from "./Step";

export const Cash = ({ jump }) => {
  const [check, setCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currencyHandler = (event) => {
    const { name, value } = event.target;
    setCheck({ ...check, [name]: value });
    event.preventDefault();
  };

  const continueHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/user/mail", {
        mungu: check,
      });

      console.log(res);

      jump();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 gap-[200px] h-full">
      <div className="flex flex-col items-center mt-12 gap-[40px] h-full">
        <div className="text-2xl flex items-center gap-4 font-bold">
          <BiLogoNetlify className="w-[40px] h-[40px] text-blue-500" />
          Geld
        </div>
        <div className="flex  items-center">
          <div className="bg-blue-500 text-center text-white justify-center pt-1 h-8 w-8 rounded-full">
            <p>1</p>
            <p className="text-black flex mt-2 justify-center text-center">
              Currency
            </p>
          </div>
          <div className="flex w-[100px] bg-gray-400 h-1"></div>
          <div className="bg-blue-500 text-center text-white justify-center pt-1 h-8 w-8 rounded-full">
            <p>2</p>
            <p className="text-black flex mt-2 justify-center text-center">
              Balance
            </p>
          </div>
          <div className="flex w-[100px] bg-gray-400 h-1"></div>
          <div className="bg-gray-400 text-center text-black justify-center pt-1 h-8 w-8 rounded-full">
            <p>3</p>
            <p className="text-black flex mt-2 justify-center text-center">
              Finish
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <GiTwoCoins className="bg-blue-600 text-white w-[70px] rounded-full text-sm h-[65px]" />
        <p className="font-bold text-xl">Set up your cash Balance</p>
        <Inputfor
          name={"mungu"}
          onChange={currencyHandler}
          placeholder={"Cash"}
        />
        <div className="flex items-center w-[330px]">
          How much cash do you have in your wallet?
        </div>
        <Button
          onClick={continueHandler}
          rounded={"rounded-xl"}
          width={"w-[400px]"}
          bg={"bg-blue-600"}
          text={"Confirm"}
          tcolor={"text-white"}
          hover={"hover:bg-blue-600"}
        />
      </div>
    </div>
  );
};
