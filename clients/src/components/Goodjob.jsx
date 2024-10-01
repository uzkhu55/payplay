"use client";

import { Button } from "./Button";
import { BiLogoNetlify } from "react-icons/bi";
import Link from "next/link";
import { IoCheckmarkOutline } from "react-icons/io5";

export const Goodjob = ({ jump }) => {
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
          <div className="bg-blue-500 text-center text-white justify-center pt-1 h-8 w-8 rounded-full">
            <p>3</p>
            <p className="text-black flex mt-2 justify-center text-center">
              Finish
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <IoCheckmarkOutline className="bg-blue-600 text-white w-[70px] rounded-full  h-[65px]" />
        <p className="font-bold text-2xl">Good Job!</p>
        <div className="flex items-center text-center w-[350px]">
          Your very first account has been created. Now continue to dashboard
          and start tracking
        </div>
        {/* <Link href="/dashboard"> */}
        <Button
          onClick={jump}
          rounded={"rounded-xl"}
          width={"w-[300px]"}
          bg={"bg-blue-600"}
          text={"Go to dashboard"}
          tcolor={"text-white"}
          hover={"hover:bg-blue-600"}
        />
        {/* </Link> */}
      </div>
    </div>
  );
};
