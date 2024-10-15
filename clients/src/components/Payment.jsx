"use client";

import { Button } from "./Button";
import { BiLogoNetlify } from "react-icons/bi";
import { GrCurrency } from "react-icons/gr";

import Select from "./Select";
// import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useUser } from "@/provider/UserProvider";

const Payment = ({ jump }) => {
  const [currency, setCurrency] = useState("MNT - Mongol Tugrik");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const currencyHandler = (event) => {
    event.preventDefault();
    setCurrency(event.target.value);
  };

  const continueHandler = async () => {
    try {
      // setLoading(true);
      await axios.post("https://payplay-plhh.onrender.com/api/user/confirm", {
        currency: currency,
        userId: uuidv4(),
      });

      jump();
      // setLoading(false);
    } catch (error) {
      console.log(error);

      console.log("ddd");
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
          <div className="bg-gray-400 text-center text-black justify-center pt-1 h-8 w-8 rounded-full">
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
      <div className="flex flex-col items-center gap-12">
        <GrCurrency className="bg-blue-600 text-white w-[100px]  h-[70px]" />
        <p className="font-bold text-xl">Select base currency</p>
        <Select
          bg={"bg-gray-100"}
          color={"font-bold"}
          height={"h-[70px]"}
          text={"MNT - Mongol Tugrik"}
          width={"w-[400px]"}
          text1={"USD - Dollar"}
          onChange={currencyHandler}
        />
        <div className="flex text-sm text-gray-500 items-center w-[440px]">
          Your base currency should be the one you use most often. All
          transaction in other currencies will be calculated based on this one
        </div>
        <Button
          loading={loading}
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

export default Payment;
