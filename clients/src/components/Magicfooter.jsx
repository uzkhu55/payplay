import Link from "next/link";

const Magicfooter = () => {
  return (
    <div className="flex justify-between relative z-50 text-center bg-black ">
      <Link href="/magicword">
        <button className="w-[504px] text-white bg-gradient-to-r from-orange-400 to-pink-600 p-4">
          MAGIC WORD
        </button>
      </Link>
      <Link href="/comingsoon">
        <button className="w-[504px] text-white bg-gradient-to-r from-orange-400 to-pink-600 p-4">
          WORD FINDER
        </button>
      </Link>
      <Link href="/comingsoon">
        <button className="w-[503px] text-white bg-gradient-to-r from-orange-400 to-pink-600 p-4">
          WORD COLLECTOR
        </button>
      </Link>
    </div>
  );
};

export default Magicfooter;
