import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex justify-between relative z-50 px-8 p-4 text-center bg-black ">
      <Link href="/dashboard">
        <button className="w-[240px] text-white border-2 border-orange-400   rounded-lg p-4">
          Home
        </button>
      </Link>
      <Link href="/menu">
        <button className="w-[240px] text-white border-2 border-orange-400   rounded-lg p-4">
          MENU
        </button>
      </Link>
      <Link href="/profile">
        <button className="w-[240px] text-white border-2 border-orange-400   rounded-lg p-4">
          Profile
        </button>
      </Link>
    </div>
  );
};
