"use client";

const Header = () => {
  return (
    <header className="w-full bg-black text-white">
      <div className="p-4 max-w-10xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 text-sm text-black">
          <div className=" p-1 flex flex-col gap-2 justify-center text-center">
            <p className="font-semibold text-white">PAYPLAY POINT</p>
            <p className="bg-gradient-to-r from-orange-400 to-pink-600 text-white  rounded-lg text-lg">
              312 POINTS
            </p>
          </div>
          <div className=" p-1 flex flex-col gap-2 justify-center text-center">
            <p className="font-semibold text-white">PAYPLAY WALLET</p>
            <p className="bg-gradient-to-r from-orange-400 to-pink-600 text-white  rounded-lg text-lg">
              312 $
            </p>
          </div>
          <div className=" p-1 flex flex-col gap-2 justify-center text-center">
            <p className="font-semibold text-white">
              PAYPLAY PROFIT (ONLY BUSINESS)
            </p>
            <p className="bg-gradient-to-r from-orange-400 to-pink-600 text-white  rounded-lg text-lg">
              312 $ / YEAR
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
